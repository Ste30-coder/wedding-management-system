import { Module } from '@nestjs/common';
import { WebhooksController } from './webhooks.controller';
import { WebhooksService } from './webhooks.service';
import { PrismaModule } from '../prisma/prisma.module';
import { RSVPService } from '../services/rsvp.service';
import { MessagesModule } from '../messages/messages.module';

@Module({
  imports: [PrismaModule, MessagesModule],
  controllers: [WebhooksController],
  providers: [WebhooksService, RSVPService],
})
export class WebhooksModule {}
