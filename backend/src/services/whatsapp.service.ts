import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import * as Twilio from 'twilio';

/**
 * Service to handle communication with WhatsApp.
 * Supports both Meta Cloud API and Twilio Sandbox.
 */
@Injectable()
export class WhatsAppService {
  private readonly logger = new Logger(WhatsAppService.name);
  private twilioClient: Twilio.Twilio;

  constructor(private config: ConfigService) {
    const twilioSid = this.config.get<string>('TWILIO_ACCOUNT_SID');
    const twilioAuthToken = this.config.get<string>('TWILIO_AUTH_TOKEN');

    if (twilioSid && twilioAuthToken && !twilioSid.includes('xxxx')) {
      this.twilioClient = Twilio(twilioSid, twilioAuthToken);
      this.logger.log('WhatsApp Service: Using Twilio Integration');
    } else {
      this.logger.log('WhatsApp Service: Using Meta Cloud API Integration');
    }
  }

  /**
   * Internal helper to send a message via Meta API or Twilio.
   */
  async sendMessage(to: string, templateName: string, variables: any = {}) {
    this.logger.debug(`[OUTBOUND] Queuing message to: ${to} (Template: ${templateName})`);

    // 1. Check if using Twilio
    if (this.twilioClient) {
      return this.sendViaTwilio(to, templateName, variables);
    }

    // 2. Fallback to Meta Cloud API (Your existing implementation)
    return this.sendViaMeta(to, templateName, variables);
  }

  private async sendViaTwilio(to: string, templateName: string, variables: any = {}) {
    try {
      const from = this.config.get('TWILIO_PHONE_NUMBER') || 'whatsapp:+14155238886';
      
      // For Sandbox, we map variables into a simple text message.
      // In a real project, you would map templateName to actual template content.
      const messageBody = `Hello! You have a wedding invitation. (Template: ${templateName})`; 
      
      const message = await this.twilioClient.messages.create({
        body: messageBody,
        from: from,
        to: `whatsapp:${to.startsWith('+') ? to : '+' + to}`,
      });

      return { id: message.sid, status: 'SENT_TWILIO' };
    } catch (error) {
      this.logger.error(`Twilio Send Failure: ${error.message}`);
      throw error;
    }
  }

  private async sendViaMeta(to: string, templateName: string, variables: any = {}) {
    this.logger.debug(`[OUTBOUND] Queuing message to: ${to} (Template: ${templateName})`);

    // FOR DEVELOPMENT: If you haven't set up Meta credentials yet, we mock the success.
    if (!this.config.get('WHATSAPP_ACCESS_TOKEN')) {
       this.logger.warn(`WHATSAPP_ACCESS_TOKEN is missing! MOCKING SUCCESS for: ${to}`);
       return { id: `MOCK_${Math.random().toString(36).substr(2, 9)}`, status: 'SENT' };
    }

    try {
      const response = await axios.post(
        `${this.apiUrl}/${this.phoneNumberId}/messages`,
        {
          messaging_product: 'whatsapp',
          to: to,
          type: 'template',
          template: {
            name: templateName,
            language: { code: 'en_US' },
            components: [
              {
                type: 'body',
                parameters: Object.keys(variables).map(key => ({
                    type: 'text',
                    text: variables[key]
                }))
              }
            ]
          }
        },
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          }
        }
      );
      return { id: response.data.messages[0].id, status: 'SENT' };
    } catch (error) {
      this.logger.error(`WhatsApp Send Failure [To: ${to}]: ${error.response?.data?.error?.message || error.message}`);
      throw new Error(`WhatsApp API Error: ${error.response?.data?.error?.message}`);
    }
  }
}
