import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('--- DATABASE HEALTH CHECK ---');
  
  const users = await prisma.user.findMany();
  console.log(`Users: ${users.length}`);
  users.forEach(u => console.log(` - ${u.email} (ID: ${u.id})`));

  const weddings = await prisma.wedding.findMany();
  console.log(`Weddings: ${weddings.length}`);
  weddings.forEach(w => console.log(` - ${w.brideName} & ${w.groomName} (ID: ${w.id})`));

  const sides = await prisma.weddingSide.findMany();
  console.log(`Wedding Sides: ${sides.length}`);
  sides.forEach(s => console.log(` - ${s.name} (WeddingID: ${s.weddingId})`));

  const weddingUsers = await prisma.weddingUser.findMany();
  console.log(`Wedding-User Links: ${weddingUsers.length}`);
  weddingUsers.forEach(wu => console.log(` - Link: User ${wu.userId} -> Wedding ${wu.weddingId}`));
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
