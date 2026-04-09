import { WhatsAppService } from '../src/services/whatsapp.service';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * CLI script to verify WhatsApp API integration.
 * Run with: npx ts-node scripts/test-message.ts <your-phone-number>
 */
async function run() {
    const config = new ConfigService();
    const whatsapp = new WhatsAppService(config);

    const testNumber = process.argv[2];

    if (!testNumber) {
        console.log('\n❌ Missing Phone Number!');
        console.log('Usage: npx ts-node scripts/test-message.ts <phone_number_with_country_code>');
        console.log('Example: npx ts-node scripts/test-message.ts 919876543210\n');
        return;
    }

    console.log(`\n-----------------------------------------`);
    console.log(`🚀 Sending test WhatsApp message...`);
    console.log(`📱 Recipient: ${testNumber}`);
    console.log(`📂 Template: hello_world`);
    console.log(`-----------------------------------------\n`);

    try {
        const response = await whatsapp.sendMessage(testNumber, 'hello_world');
        console.log('✅ API SUCCESS!');
        console.log('Message ID:', response.id);
        console.log('Status:', response.status);
        console.log('\nCheck your phone! You should see a "Hello World" message shortly.\n');
    } catch (err) {
        console.error('\n❌ API FAILURE!');
        console.error('Error Details:', err.message);

        if (err.message.includes('WHATSAPP_ACCESS_TOKEN is missing')) {
            console.log('\n💡 Tip: Check your .env file. WHATSAPP_ACCESS_TOKEN and WHATSAPP_PHONE_NUMBER_ID must be set.');
        } else if (err.message.includes('401')) {
            console.log('\n💡 Tip: Your Meta Access Token might be expired or invalid.');
        } else {
            console.log('\n💡 Tip: If using the Meta Sandbox, ensure your number is added to the "Recipient Phone Numbers" list in the Meta Developer Portal.');
        }
        console.log('\n');
    }
}

run().catch(console.error);
