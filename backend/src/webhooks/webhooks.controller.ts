import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Query, 
  HttpCode, 
  HttpStatus, 
  Logger,
  BadRequestException
} from '@nestjs/common';
import { WebhooksService } from './webhooks.service';

/**
 * Controller for handling external WhatsApp/Messaging Webhooks.
 * This endpoint is public as providers need to reach it without traditional JWT auth.
 */
@Controller('webhooks/whatsapp')
export class WebhooksController {
  private readonly logger = new Logger(WebhooksController.name);

  constructor(private readonly webhooksService: WebhooksService) {}

  /**
   * GET Verification: Required by Meta (WhatsApp Business) to verify the webhook.
   */
  @Get()
  verifyWebhook(
    @Query('hub.mode') mode: string,
    @Query('hub.verify_token') token: string,
    @Query('hub.challenge') challenge: string,
  ) {
    this.logger.log(`Webhook Verification Request Received. Mode: ${mode}`);
    
    // Replace 'wedding-secret-token' with your actual verify token from .env
    const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN || 'wedding-secret-token';

    if (mode === 'subscribe' && token === verifyToken) {
      this.logger.log('Webhook Verified Successfully.');
      return challenge;
    }
    
    throw new BadRequestException('Verification failed: Tokens do not match.');
  }

  /**
   * POST Notification: Receives actual inbound messages/replies.
   */
  @Post()
  @HttpCode(HttpStatus.OK) // WhatsApp expects 200 OK
  async handleInbound(
    @Body() payload: any
  ) {
    this.logger.debug('Inbound message payload received.');
    
    // We pass the raw payload to the service for parsing
    await this.webhooksService.processInboundPayload(payload);
    
    return { status: 'received' };
  }
}
