import { Injectable, Logger, ConflictException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { PrismaService } from '../prisma/prisma.service';
import { MessageDirection, MessageStatus } from '@prisma/client';

/**
 * Service to handle queuing and tracking of WhatsApp messages.
 */
@Injectable()
export class MessagesService {
  private readonly logger = new Logger(MessagesService.name);

  constructor(
    @InjectQueue('messages') private readonly messageQueue: Queue,
    private readonly prisma: PrismaService
  ) {}

  /**
   * Main function to queue an OUTBOUND message.
   * This creates a record in the database first, then pushes it to the BullMQ queue.
   */
  async queueMessage(
    weddingId: string, 
    guestId: string, 
    sideId: string,
    templateName: string, 
    variables: any = {}, 
    phoneNumber: string
  ) {
    this.logger.debug(`[OUTBOUND] Queuing message to: ${phoneNumber} (Guest: ${guestId})`);

    // 1. Create a NEW Message record (STATUS: QUEUED)
    const message = await this.prisma.message.create({
      data: {
        weddingId,
        sideId,
        guestId,
        direction: MessageDirection.OUTBOUND,
        status: MessageStatus.QUEUED,
        body: `TEMPLATE: ${templateName} | VARS: ${JSON.stringify(variables)}`,
      }
    });

    // 2. Add to BullMQ Queue for background processing
    const job = await this.messageQueue.add('messages', {
      messageId: message.id,
      guestId,
      to: phoneNumber,
      templateName,
      variables
    }, {
      attempts: 3, // Retry up to 3 times on failure
      backoff: {
        type: 'exponential',
        delay: 5000 // Start with a 5-second backoff
      }
    });

    this.logger.log(`SUCCESS: Message ${message.id} queued (Job: ${job.id})`);
    return { 
       messageId: message.id, 
       jobId: job.id, 
       status: 'QUEUED' 
    };
  }

  /**
   * Send an invitation to a single guest (Manual Trigger)
   */
  async sendSingle(guestId: string) {
      const guest = await this.prisma.guest.findUnique({
          where: { id: guestId },
          include: { wedding: true }
      });

      if (!guest) throw new Error('Guest not found');

      return this.queueMessage(
          guest.weddingId,
          guest.id,
          guest.sideId,
          'wedding_invitation_v1',
          { guestName: guest.fullName, weddingName: `${guest.wedding.brideName} & ${guest.wedding.groomName}` },
          guest.phoneNumber
      );
  }

  /**
   * Quick status check for a message.
   */
  async getMessageStatus(id: string) {
    return this.prisma.message.findUnique({
      where: { id }
    });
  }
}
