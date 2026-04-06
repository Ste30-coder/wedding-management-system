import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { MessagesService } from '../messages/messages.service';
import { RSVPStatus } from '@prisma/client';

@Injectable()
export class RemindersService {
  private readonly logger = new Logger(RemindersService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly messagesService: MessagesService,
  ) {}

  /**
   * Runs daily to send follow-up reminders to guests who haven't RSVPed.
   */
  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  async handleDailyReminders() {
    this.logger.log('Starting Daily RSVP Reminders Job...');

    // 1. Get all active weddings with reminder settings
    const weddings = await this.prisma.wedding.findMany({
      where: { isActive: true },
    });

    for (const wedding of weddings) {
      const { id: weddingId, reminderDays, maxReminders } = wedding;

      // 2. Find pending RSVPs that need a reminder
      // We look for:
      // - Status is PENDING
      // - We haven't exceeded maxReminders
      // - (Never reminded OR last reminded > reminderDays ago)
      const now = new Date();
      const thresholdDate = new Date();
      thresholdDate.setDate(now.getDate() - reminderDays);

      const pendingRSVPs = await this.prisma.rSVPResponse.findMany({
        where: {
          weddingId,
          status: RSVPStatus.PENDING,
          reminderCount: { lt: maxReminders },
          OR: [
            { lastRemindedAt: null }, // Never reminded
            { lastRemindedAt: { lt: thresholdDate } }, // Reminded long ago
          ],
          // Also Ensure the initial creation was at least X days ago 
          createdAt: { lt: thresholdDate }
        },
        include: {
          guest: true,
          campaign: true,
        },
      });

      this.logger.log(`Found ${pendingRSVPs.length} guests needing reminders for wedding: ${weddingId}`);

      for (const rsvp of pendingRSVPs) {
        if (!rsvp.campaign) continue;

        try {
          this.logger.debug(`[REMINDER] Sending follow-up to ${rsvp.guest.fullName} (${rsvp.guest.phoneNumber})`);

          // 3. Queue the reminder message
          // We use the same template as the original campaign for a nudge
          const variables = {
             ...((rsvp.campaign.templateVariables as object) || {}),
             guestName: rsvp.guest.fullName,
             isReminder: true
          };

          await this.messagesService.queueMessage(
            weddingId,
            rsvp.guestId,
            rsvp.sideId,
            rsvp.campaign.templateName,
            variables,
            rsvp.guest.phoneNumber
          );

          // 4. Update the RSVP record with reminder stats
          await this.prisma.rSVPResponse.update({
            where: { id: rsvp.id },
            data: {
              reminderCount: rsvp.reminderCount + 1,
              lastRemindedAt: new Date(),
            },
          });

        } catch (error) {
          this.logger.error(`Error reminding guest ${rsvp.guestId}: ${error.message}`);
        }
      }
    }

    this.logger.log('Daily RSVP Reminders Job Completed.');
  }
}
