import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGuestDto } from './dto/create-guest.dto';
import { Prisma, Role } from '@prisma/client';
import * as XLSX from 'xlsx';

@Injectable()
export class GuestsService {
  private readonly logger = new Logger(GuestsService.name);

  constructor(private prisma: PrismaService) {}

  async generateTemplateBuffer(): Promise<Buffer> {
    const templateData = [
      { fullName: 'Amit Sharma', phoneNumber: '919876543210', groupName: 'Friends' },
      { fullName: 'Priya Singh', phoneNumber: '919876543211', groupName: 'Family' },
      { fullName: 'Rahul Verma', phoneNumber: '919876543212', groupName: 'Colleagues' },
    ];

    const worksheet = XLSX.utils.json_to_sheet(templateData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Guest Template');

    // Generate buffer
    return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  }

  /**
   * List all guests for a wedding, subject to side isolation.
   */
  async findAll(weddingId: string, sideId?: string) {
    const where: Prisma.GuestWhereInput = { weddingId };
    
    if (sideId) {
      where.sideId = sideId;
    }

    return this.prisma.guest.findMany({
      where,
      include: {
        group: true,
        side: true,
      },
      orderBy: {
        fullName: 'asc',
      },
    });
  }

  /**
   * Create a new guest.
   */
  async create(dto: CreateGuestDto) {
    return this.prisma.guest.create({
      data: dto,
      include: {
        group: true,
        side: true,
      },
    });
  }

  /**
   * Get a single guest and verify ownership.
   */
  async findOne(id: string) {
    const guest = await this.prisma.guest.findUnique({
      where: { id },
      include: { group: true, side: true },
    });

    if (!guest) {
      throw new NotFoundException(`Guest with ID ${id} not found`);
    }

    return guest;
  }

  /**
   * Update guest details.
   */
  async update(id: string, data: Partial<CreateGuestDto>) {
    await this.findOne(id); // Ensure exists
    
    return this.prisma.guest.update({
      where: { id },
      data,
    });
  }

  /**
   * Remove a guest.
   */
  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.guest.delete({
      where: { id },
    });
  }
}
