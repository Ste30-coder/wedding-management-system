import { 
  Controller, 
  Get, 
  UseGuards, 
  Query, 
  ParseUUIDPipe,
  Request
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DashboardService } from './dashboard.service';
import { SideGuard } from '../guards/side.guard';

@Controller('dashboard')
@UseGuards(AuthGuard('jwt'), SideGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  async getStats(
    @Query('weddingId', new ParseUUIDPipe({ optional: true })) weddingId: string | null,
    @Query('sideId', new ParseUUIDPipe({ optional: true })) sideId?: string,
  ) {
    try {
      if (!weddingId || weddingId === 'undefined') return null;
      return await this.dashboardService.getStats(weddingId, sideId);
    } catch (error) {
      console.error('Stats fetch failed', error);
      return null;
    }
  }

  @Get('recent-activity')
  async getRecentActivity(
    @Query('weddingId', new ParseUUIDPipe({ optional: true })) weddingId: string | null,
    @Query('sideId', new ParseUUIDPipe({ optional: true })) sideId?: string,
  ) {
    try {
      if (!weddingId || weddingId === 'undefined') return [];
      return await this.dashboardService.getRecentActivity(weddingId, sideId);
    } catch (error) {
      console.error('Activity fetch failed', error);
      return [];
    }
  }

  @Get('weddings')
  async listAllWeddings(@Request() req: any) {
    return this.dashboardService.listAllWeddings(req.user.id);
  }
}
