import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RSVPService } from '../services/rsvp.service';
import { MessagesService } from '../messages/messages.service';

/**
 * Service to parse and process incoming messages from WhatsApp.
 */
@Injectable()
export class WebhooksService {
  private readonly logger = new Logger(WebhooksService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly rsvpService: RSVPService,
    private readonly messagesService: MessagesService
  ) {}

  /**
   * Main entry point to process different types of payloads (Meta, Twilio, or n8n).
   * For this implementation, we focus on Meta Cloud API format.
   */
  async processInboundPayload(payload: any) {
    try {
      // 1. Meta (WhatsApp Business API) format check
      if (payload.object === 'whatsapp_business_account' && payload.entry) {
        for (const entry of payload.entry) {
          for (const change of entry.changes) {
            const value = change.value;
            if (value.messages && value.messages.length > 0) {
              for (const msg of value.messages) {
                await this.handleMessageItem(msg.from, msg.text?.body, msg.id);
              }
            }
          }
        }
      }
    } catch (error) {
      this.logger.error('CRITICAL: Failed to process webhook data', error.stack);
    }
  }

  /**
   * Internal logic for handling a single message after identity extraction.
   * @param fromPhone Sender's raw phone number from the message
   * @param body Message content text
   * @param providerMsgId ID from the provider (to avoid duplicates)
   */
  private async handleMessageItem(fromPhone: string, body: string | undefined, providerMsgId: string) {
    if (!body) return;
    
    // Normalize phone number (Remove + if present, ensuring it matches DB format)
    const normalizedPhone = fromPhone.replace('+', '').trim();
    this.logger.log(`Incoming reply from ${normalizedPhone}: "${body}"`);

    // 1. Find the guest in the DB by their phone number
    const guest = await this.prisma.guest.findFirst({
       where: { phoneNumber: { contains: normalizedPhone } }, // Partial match works for varied formats
       include: { wedding: true }
    });

    if (!guest) {
      this.logger.warn(`UNKNOWN GUEST: No guest found for phone ${normalizedPhone}. Ignoring message.`);
      return;
    }

    // 2. Classify the response text using our existing RSVPService
    const status = this.rsvpService.classifyResponse(body);
    const headcount = this.rsvpService.extractHeadcount(body) || 1; // Default to 1 if not specified

    this.logger.log(`MATCHED GUEST: ${guest.fullName}. Classified as: ${status} (Headcount: ${headcount})`);

    // 3. Find or Create the RSVPResponse
    // Note: We use findFirst instead of upsert to safely handle NULL campaignId combinations
    const existingRSVP = await this.prisma.rSVPResponse.findFirst({
      where: { 
        guestId: guest.id, 
        campaignId: null 
      }
    });

    if (existingRSVP) {
      await this.prisma.rSVPResponse.update({
        where: { id: existingRSVP.id },
        data: {
          status: status,
          confirmedHeadcount: headcount,
          rawResponse: body,
          respondedAt: new Date()
        }
      });
    } else {
      await this.prisma.rSVPResponse.create({
        data: {
          weddingId: guest.weddingId,
          sideId: guest.sideId,
          guestId: guest.id,
          groupId: guest.groupId,
          status: status,
          confirmedHeadcount: headcount,
          rawResponse: body,
          respondedAt: new Date()
        }
      });
    }

    // 4. Trigger an Automated "Thank You" Reply
    try {
        const replyTemplate = status === 'CONFIRMED' ? 'rsvp_confirmed_thanks' : 'rsvp_declined_ack';
        
        await this.messagesService.queueMessage(
            guest.weddingId,
            guest.id,
            guest.sideId,
            replyTemplate,
            { guestName: guest.fullName },
            guest.phoneNumber
        );
        this.logger.log(`AUTO-REPLY SENT: Sent ${replyTemplate} to ${guest.fullName}.`);
    } catch (e) {
        this.logger.error(`FAILED AUTO-REPLY: Could not send confirmation to ${guest.fullName}: ${e.message}`);
    }

    this.logger.log(`DB UPDATED: Guest status ${guest.fullName} is now ${status}.`);
  }
}
