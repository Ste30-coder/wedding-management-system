import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RSVPStatus } from '@prisma/client';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats(weddingId: string, sideId?: string) {
    const where: any = { weddingId };
    if (sideId) {
      where.sideId = sideId;
    }

    const [total, confirmed, declined, pending] = await Promise.all([
      this.prisma.guest.count({ where }),
      this.prisma.guest.count({ 
        where: { 
          ...where, 
          rsvpResponses: {
            some: { status: RSVPStatus.CONFIRMED }
          }
        } 
      }),
      this.prisma.guest.count({ 
        where: { 
          ...where, 
          rsvpResponses: {
            some: { status: RSVPStatus.DECLINED }
          }
        } 
      }),
      this.prisma.guest.count({ 
        where: { 
          ...where, 
          rsvpResponses: {
            some: { status: RSVPStatus.PENDING }
          }
        } 
      }),
    ]);

    const confirmedRate = total > 0 ? (confirmed / total) * 100 : 0;

    // 4. Calculate real trends (comparing with 7 days ago)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const [totalOld, confirmedOld] = await Promise.all([
      this.prisma.guest.count({ 
        where: { ...where, createdAt: { lt: sevenDaysAgo } } 
      }),
      this.prisma.guest.count({ 
        where: { 
            ...where, 
            createdAt: { lt: sevenDaysAgo },
            rsvpResponses: { some: { status: RSVPStatus.CONFIRMED, createdAt: { lt: sevenDaysAgo } } } 
        } 
      })
    ]);

    const calculateChange = (now: number, old: number) => {
      if (old === 0) return now > 0 ? '+100%' : '0%';
      const change = ((now - old) / old) * 100;
      return `${change >= 0 ? '+' : ''}${Math.round(change)}%`;
    };

    return {
      totalGuests: total,
      confirmedCount: confirmed,
      declinedCount: declined,
      pendingCount: pending,
      confirmedRate: Math.round(confirmedRate),
      trends: {
        total: calculateChange(total, totalOld),
        confirmed: `${Math.round(confirmedRate)}% rate`,
        declined: 'Updated in real-time',
        pending: 'Requires attention'
      }
    };
  }

  async getRecentActivity(weddingId: string, sideId?: string, limit = 5) {
    const where: any = { weddingId };
    if (sideId) {
      where.sideId = sideId;
    }

    const guests = await this.prisma.guest.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
      take: limit,
      include: { 
        group: true,
        rsvpResponses: {
          take: 1,
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    // Flatten the status for the frontend
    return guests.map(guest => ({
      ...guest,
      status: guest.rsvpResponses?.[0]?.status || 'PENDING'
    }));
  }

  async listAllWeddings(userId: string) {
    return this.prisma.wedding.findMany({
      where: {
        weddingUsers: {
          some: { userId: userId }
        }
      },
      include: { sides: true },
      take: 10,
    });
  }
}
