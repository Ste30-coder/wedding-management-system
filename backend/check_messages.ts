import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('--- RECENT MESSAGES CHECK ---');
    const messages = await prisma.message.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: { guest: true }
    });

    if (messages.length === 0) {
        console.log('❌ No messages found in the database.');
        return;
    }

    messages.forEach(m => {
        console.log(`- To: ${m.guest?.fullName || 'Unknown'} (${m.guest?.phoneNumber || 'N/A'})`);
        console.log(`  Status: ${m.status}`);
        console.log(`  WhatsApp ID: ${m.whatsappMsgId}`);
        console.log(`  Direction: ${m.direction}`);
        console.log(`  Error: ${m.errorMessage || 'None'}`);
        console.log(`  Created: ${m.createdAt}`);
        console.log('---------------------------');
    });
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
