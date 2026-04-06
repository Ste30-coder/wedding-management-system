import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MessagesProcessor } from './messages.processor';
import { WhatsAppService } from '../services/whatsapp.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    // Register the 'messages' queue for BullMQ
    BullModule.registerQueue({
      name: 'messages',
    }),
    // Ensure we have access to Prisma for database operations
    PrismaModule,
  ],
  controllers: [MessagesController],
  providers: [
    MessagesService, 
    MessagesProcessor, 
    WhatsAppService
  ],
  exports: [MessagesService], // Export so Campaigns can use it to send invites
})
export class MessagesModule {}
