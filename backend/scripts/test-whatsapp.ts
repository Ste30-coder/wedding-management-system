import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * QUICK TEST SCRIPT: Use this to verify your Meta WhatsApp integration.
 */
async function testDirectMessage(targetPhone: string) {
    const token = process.env.WHATSAPP_ACCESS_TOKEN;
    const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;

    if (!token || !phoneId) {
        console.error('❌ ERROR: Missing WHATSAPP_ACCESS_TOKEN or WHATSAPP_PHONE_NUMBER_ID in .env');
        process.exit(1);
    }

    console.log(`🚀 ATTEMPTING TO SEND TEST MESSAGE TO: ${targetPhone}...`);

    try {
        const response = await axios.post(
            `https://graph.facebook.com/v21.0/${phoneId}/messages`,
            {
                messaging_product: 'whatsapp',
                to: targetPhone,
                type: 'template',
                template: {
                    name: 'hello_world', // Default Meta test template
                    language: { code: 'en_US' }
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        console.log('✅ SUCCESS! Meta Message ID:', response.data.messages[0].id);
        console.log('--- Check your phone now! ---');
    } catch (error: any) {
        console.error('❌ FAILED:');
        console.error(JSON.stringify(error.response?.data || error.message, null, 2));
    }
}

// Get phone from command line argument
const phone = process.argv[2];
if (!phone) {
    console.error('❌ Provide a phone number: npx ts-node scripts/test-whatsapp.ts 919876543210');
} else {
    testDirectMessage(phone);
}
