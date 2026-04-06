import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

/**
 * Service to handle raw communication with the Meta Cloud WhatsApp API.
 * In production, this would use a real Meta Token and Phone Number ID.
 */
@Injectable()
export class WhatsAppService {
  private readonly logger = new Logger(WhatsAppService.name);
  private readonly apiUrl: string;
  private readonly accessToken: string;
  private readonly phoneNumberId: string;

  constructor(private config: ConfigService) {
    // These would be in your .env file
    this.apiUrl = `https://graph.facebook.com/v21.0`; 
    this.phoneNumberId = this.config.get<string>('WHATSAPP_PHONE_NUMBER_ID') || 'YOUR_PHONE_NUMBER_ID_MOCK';
    this.accessToken = this.config.get<string>('WHATSAPP_ACCESS_TOKEN') || 'YOUR_ACCESS_TOKEN_MOCK';
  }

  /**
   * Internal helper to send a message via Meta API.
   */
  async sendMessage(to: string, templateName: string, variables: any = {}) {
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
