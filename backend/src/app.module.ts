import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { ScheduleModule } from '@nestjs/schedule';
import { RSVPService } from './services/rsvp.service';
import { RemindersService } from './services/reminders.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { GuestsModule } from './guests/guests.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { WebhooksModule } from './webhooks/webhooks.module';
import { AuthModule } from './auth/auth.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // Enable background job scheduling
    ScheduleModule.forRoot(),
    // Configure BullMQ with the default Redis server (localhost:6379)
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    PrismaModule, 
    GuestsModule, 
    DashboardModule,
    WebhooksModule,
    AuthModule,
    CampaignsModule,
    MessagesModule
  ],
  controllers: [AppController],
  providers: [AppService, RSVPService, RemindersService],
})
export class AppModule {}
