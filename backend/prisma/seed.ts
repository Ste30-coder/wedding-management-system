import 'dotenv/config';
import { PrismaClient, RSVPStatus } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('--- Starting Database Seeding ---');

  // Hashed Password for Admin
  const hashedPassword = await bcrypt.hash('admin123', 10);

  // 1. Create a User (Primary Admin)
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@weddings.com' },
    update: {
      password: hashedPassword
    },
    create: {
      email: 'admin@weddings.com',
      fullName: 'George Varghese',
      password: hashedPassword,
      phone: '+919876543210',
      isVerified: true,
    },
  });

  console.log(`- Created Admin User: ${adminUser.fullName}`);

  // 2. Create a Wedding
  const wedding = await prisma.wedding.upsert({
    where: { tenantSlug: 'rahul-priya-2025' },
    update: {},
    create: {
      tenantSlug: 'rahul-priya-2025',
      brideName: 'Priya',
      groomName: 'Rahul',
      weddingDate: new Date('2025-12-15T18:00:00Z'),
      venue: 'Grand Ballroom, Trivandrum',
      createdBy: adminUser.id,
      whatsappConfig: {
        templateId: 'wedding_invitation_v1',
      },
    },
  });

  console.log(`- Created Wedding for: ${wedding.brideName} & ${wedding.groomName}`);

  // 2b. Link Admin User to this Wedding (Required for SideGuard)
  await prisma.weddingUser.upsert({
    where: { 
      weddingId_userId: { 
        weddingId: wedding.id, 
        userId: adminUser.id 
      } 
    },
    update: {
      role: 'WEDDING_ADMIN' // Ensure he has correct role
    },
    create: {
      weddingId: wedding.id,
      userId: adminUser.id,
      role: 'WEDDING_ADMIN'
    },
  });

  console.log(`- Granted access for ${adminUser.fullName} to managing this wedding.`);
  const brideSide = await prisma.weddingSide.upsert({
    where: { weddingId_name: { weddingId: wedding.id, name: 'bride' } },
    update: {},
    create: {
      weddingId: wedding.id,
      name: 'bride',
      displayName: 'Bride Side',
      colorHex: '#E91E8C',
    },
  });

  const groomSide = await prisma.weddingSide.upsert({
    where: { weddingId_name: { weddingId: wedding.id, name: 'groom' } },
    update: {},
    create: {
      weddingId: wedding.id,
      name: 'groom',
      displayName: 'Groom Side',
      colorHex: '#0E7490',
    },
  });

  console.log('- Created Wedding Sides (Bride & Groom)');

  // 4. Create Guest Groups
  const closeRelativesGroup = await prisma.guestGroup.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' }, // Dummy ID for upsert or find by name
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      weddingId: wedding.id,
      sideId: brideSide.id,
      name: 'Close Relatives',
    },
  });

  const collegeFriendsGroup = await prisma.guestGroup.upsert({
    where: { id: '00000000-0000-0000-0000-000000000002' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000002',
      weddingId: wedding.id,
      sideId: groomSide.id,
      name: 'College Friends',
    },
  });

  console.log('- Created Guest Groups');

  // 5. Create Sample Guests & RSVP Responses
  const guestData = [
    {
      fullName: 'Sunita Sharma',
      phoneNumber: '+919876543211',
      sideId: brideSide.id,
      groupId: closeRelativesGroup.id,
      status: RSVPStatus.CONFIRMED,
      headcount: 4,
    },
    {
      fullName: 'Ramesh Sharma',
      phoneNumber: '+919876543212',
      sideId: brideSide.id,
      groupId: closeRelativesGroup.id,
      status: RSVPStatus.PENDING,
      headcount: 0,
    },
    {
      fullName: 'Kiran Mehta',
      phoneNumber: '+919845001234',
      sideId: groomSide.id,
      groupId: collegeFriendsGroup.id,
      status: RSVPStatus.DECLINED,
      headcount: 0,
    },
    {
      fullName: 'Arjun Nair',
      phoneNumber: '+919900887766',
      sideId: groomSide.id,
      groupId: collegeFriendsGroup.id,
      status: RSVPStatus.CONFIRMED,
      headcount: 1,
    },
  ];

  for (const data of guestData) {
    const { status, headcount, ...guestInfo } = data;
    
    // Upsert Guest (Unique on weddingId + phoneNumber)
    const guest = await prisma.guest.upsert({
      where: {
        weddingId_phoneNumber: {
          weddingId: wedding.id,
          phoneNumber: guestInfo.phoneNumber,
        },
      },
      update: guestInfo,
      create: {
        ...guestInfo,
        weddingId: wedding.id,
      },
    });

    // Create RSVP Response for the guest if it doesn't exist
    // Unique on [guestId, campaignId]
    const existingRSVP = await prisma.rSVPResponse.findFirst({
        where: { guestId: guest.id, campaignId: null }
    });

    if (!existingRSVP) {
        await prisma.rSVPResponse.create({
            data: {
              weddingId: wedding.id,
              sideId: guest.sideId,
              guestId: guest.id,
              groupId: guest.groupId,
              status: status,
              confirmedHeadcount: headcount,
            },
          });
    }
  }

  console.log('- Created Sample Guests with RSVP Responses');
  console.log('--- Seeding Completed Successfully ---');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
