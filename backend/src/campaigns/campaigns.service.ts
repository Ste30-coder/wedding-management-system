import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MessagesService } from '../messages/messages.service';
import { CampaignStatus } from '@prisma/client';

/**
 * Service to manage mass-invitation campaigns.
 * This service targets guests by wedding and sideID.
 */
@Injectable()
export class CampaignsService {
  private readonly logger = new Logger(CampaignsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly messagesService: MessagesService
  ) {}

  /**
   * Create a new campaign (draft status by default).
   */
  async create(userId: string, data: { weddingId: string, sideId?: string, name: string, templateName: string, variables: any }) {
    this.logger.debug(`[CAMPAIGN] Creating new campaign: ${data.name}`);
    
    return this.prisma.campaign.create({
      data: {
        weddingId: data.weddingId,
        sideId: data.sideId || null,
        bothSides: !data.sideId,
        name: data.name,
        templateName: data.templateName,
        templateVariables: data.variables,
        createdBy: userId,
        status: CampaignStatus.DRAFT
      }
    });
  }

  /**
   * Launch a campaign by finding all matching guests and queuing their messages.
   */
  async launch(campaignId: string) {
    const campaign = await this.prisma.campaign.findUnique({
      where: { id: campaignId },
      include: { wedding: true }
    });

    if (!campaign) throw new NotFoundException('Campaign not found');
    if (campaign.status !== CampaignStatus.DRAFT) {
      throw new BadRequestException('Campaign can only be launched from DRAFT status.');
    }

    this.logger.log(`LAUNCHING CAMPAIGN: ${campaign.name} (Campaign: ${campaignId})`);

    // 1. Update status to RUNNING
    await this.prisma.campaign.update({
      where: { id: campaignId },
      data: { status: CampaignStatus.RUNNING, launchedAt: new Date() }
    });

    try {
      // 2. Find eligible guests (only those who haven't received an invitation yet)
      const guests = await this.prisma.guest.findMany({
        where: {
          weddingId: campaign.weddingId,
          sideId: campaign.sideId || undefined,
          invitationSent: false
        }
      });

      this.logger.log(`Targeting ${guests.length} guests for campaign ${campaignId}`);

      // 3. Queue a message for each guest
      for (const guest of guests) {
        // Build variables (In a real app, you might personalize this, e.g., using guest's fullName)
        const activeVariables = {
          ...((campaign.templateVariables as object) || {}),
          guestName: guest.fullName
        };

        await this.messagesService.queueMessage(
          campaign.weddingId,
          guest.id,
          guest.sideId,
          campaign.templateName,
          activeVariables,
          guest.phoneNumber
        );

        // 3.5 Create a PENDING RSVP record (if it doesn't already exist)
        // This is critical for tracking automated reminders later.
        await this.prisma.rSVPResponse.upsert({
            where: { 
                guestId_campaignId: {
                    guestId: guest.id,
                    campaignId: campaign.id
                }
            },
            update: {}, // No changes if already exists
            create: {
                weddingId: campaign.weddingId,
                sideId: guest.sideId,
                guestId: guest.id,
                campaignId: campaign.id,
                status: 'PENDING',
                confirmedHeadcount: 0
            }
        });
      }

      // 4. Final status: COMPLETED
      await this.prisma.campaign.update({
        where: { id: campaignId },
        data: { status: CampaignStatus.COMPLETED, completedAt: new Date() }
      });

      this.logger.log(`COMPLETED CAMPAIGN: ${campaign.name}. Queued ${guests.length} messages.`);
      return { success: true, count: guests.length };

    } catch (error) {
      this.logger.error(`CRITICAL: Campaign ${campaignId} failed during launch: ${error.message}`);
      await this.prisma.campaign.update({
        where: { id: campaignId },
        data: { status: CampaignStatus.FAILED }
      });
      throw error;
    }
  }

  /**
   * List all campaigns for a specific wedding.
   */
  async findAllByWedding(weddingId: string) {
    return this.prisma.campaign.findMany({
        where: { weddingId },
        orderBy: { createdAt: 'desc' }
    });
  }
}
