import { Injectable, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
const XLSX = require('xlsx');

@Injectable()
export class GuestUploadService {
  private readonly logger = new Logger(GuestUploadService.name);

  constructor(private prisma: PrismaService) {}

  async processExcel(
    buffer: Buffer, 
    weddingId: string, 
    sideId?: string
  ) {
    // ============================================================
    // STEP 0: Verify the wedding actually exists in the database.
    // This is the root cause guard — if the frontend sends a stale
    // UUID from localStorage after a DB reset, we catch it here.
    // ============================================================
    const wedding = await this.prisma.wedding.findUnique({
      where: { id: weddingId },
      include: { sides: true },
    });

    if (!wedding) {
      this.logger.error(`Wedding ID [${weddingId}] does NOT exist in the database.`);
      throw new NotFoundException(
        `Wedding not found. The ID "${weddingId}" does not exist. ` +
        `Please logout, log back in, and try again.`
      );
    }

    this.logger.log(`Wedding VERIFIED: ${wedding.brideName} & ${wedding.groomName} (${wedding.id})`);

    // ============================================================
    // STEP 1: Resolve or auto-create wedding sides
    // ============================================================
    let resolvedSideId = sideId;

    if (!resolvedSideId || resolvedSideId === 'undefined' || resolvedSideId === 'null') {
      // Use the sides we already loaded via include
      let firstSide: { id: string; name: string; weddingId: string } | null = 
        wedding.sides.find(s => s.name === 'bride') || wedding.sides[0] || null;

      if (!firstSide) {
        this.logger.warn(`No sides found. Creating [bride, groom] for wedding ${weddingId}`);
        // Wedding exists (verified above), so this createMany is safe
        await this.prisma.weddingSide.createMany({
          data: [
            { weddingId, name: 'bride', displayName: 'Bride Side' },
            { weddingId, name: 'groom', displayName: 'Groom Side' },
          ],
        });
        firstSide = await this.prisma.weddingSide.findFirst({
          where: { weddingId, name: 'bride' },
        });
      }

      if (!firstSide) {
        throw new Error('Failed to create or find wedding sides.');
      }
      resolvedSideId = firstSide.id;
    }

    this.logger.log(`IMPORT START: Wedding=${weddingId} | Side=${resolvedSideId}`);

    // ============================================================
    // STEP 2: Parse the spreadsheet
    // ============================================================
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const data: any[] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    let created = 0;
    let skipped = 0;
    let errors = 0;

    // ============================================================
    // STEP 3: Process each row
    // ============================================================
    for (const row of data) {
      try {
        const fullName = row.fullName || row['Full Name'] || row['Name'];
        const phoneNumber = row.phoneNumber || row['Phone Number'] || row['Phone'];
        const groupName = row.groupName || row['Group Name'] || row['Group'];

        if (!fullName || !phoneNumber) {
          this.logger.warn(`SKIP: Missing name/phone in row: ${JSON.stringify(row)}`);
          skipped++;
          continue;
        }

        // Resolve or create guest group
        let groupId: string | null = null;
        if (groupName) {
          let group = await this.prisma.guestGroup.findFirst({
            where: { name: groupName.toString(), weddingId, sideId: resolvedSideId },
          });
          if (!group) {
            group = await this.prisma.guestGroup.create({
              data: { weddingId, sideId: resolvedSideId, name: groupName.toString() },
            });
          }
          groupId = group.id;
        }

        // Check for existing guest (by unique weddingId + phoneNumber)
        const existingGuest = await this.prisma.guest.findUnique({
          where: {
            weddingId_phoneNumber: {
              weddingId,
              phoneNumber: phoneNumber.toString(),
            },
          },
        });

        if (existingGuest) {
          await this.prisma.guest.update({
            where: { id: existingGuest.id },
            data: {
              fullName: fullName.toString(),
              groupId: groupId || undefined,
            },
          });
        } else {
          await this.prisma.guest.create({
            data: {
              weddingId,
              sideId: resolvedSideId,
              fullName: fullName.toString(),
              phoneNumber: phoneNumber.toString(),
              groupId: groupId || undefined,
            },
          });
        }
        created++;
      } catch (rowError: any) {
        this.logger.error(`ROW ERROR [${row.fullName || '??'}]: ${rowError.message}`);
        errors++;
      }
    }

    this.logger.log(`IMPORT FINISHED: ${created} created, ${skipped} skipped, ${errors} errors.`);
    return { created, skipped, errors };
  }
}
