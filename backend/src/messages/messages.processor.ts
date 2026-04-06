import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WhatsAppService } from '../services/whatsapp.service';
import { MessageStatus } from '@prisma/client';

/**
 * Processor for the 'messages' queue.
 * This worker processes jobs in the background to send WhatsApp invites.
 */
@Processor('messages')
export class MessagesProcessor extends WorkerHost {
  private readonly logger = new Logger(MessagesProcessor.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly whatsappService: WhatsAppService
  ) {
    super();
  }

  /**
   * Process a message job.
   */
  async process(job: Job<any, any, string>): Promise<any> {
    const { messageId, to, templateName, variables, guestId } = job.data;
    
    this.logger.log(`Processing Message Job: ${job.id} (To: ${to}, MessageID: ${messageId})`);

    try {
      // 1. Send via WhatsApp Service
      const result = await this.whatsappService.sendMessage(to, templateName, variables);

      // 2. Update DB as SENT
      await this.prisma.message.update({
        where: { id: messageId },
        data: {
          status: MessageStatus.SENT,
          whatsappMsgId: result.id,
          sentAt: new Date()
        }
      });

      // 3. Update the Guest as "Invitation Sent"
      await this.prisma.guest.update({
        where: { id: guestId },
        data: { invitationSent: true }
      });

      this.logger.log(`SUCCESS: Message ${messageId} sent to ${to}. (WhatsApp ID: ${result.id})`);
      return { success: true, whatsappId: result.id };

    } catch (error) {
      this.logger.error(`FAILURE: Message ${messageId} failed: ${error.message}`);
      
      // 4. Update DB as FAILED for tracking
      await this.prisma.message.update({
        where: { id: messageId },
        data: { 
          status: MessageStatus.FAILED,
          errorMessage: error.message
        }
      });
      
      throw error; // Let BullMQ handle retries if configured
    }
  }
}
