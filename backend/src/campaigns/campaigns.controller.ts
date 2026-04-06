import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  UseGuards, 
  Query, 
  ParseUUIDPipe,
  Request
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CampaignsService } from './campaigns.service';
import { SideGuard } from '../guards/side.guard';

@Controller('campaigns')
@UseGuards(AuthGuard('jwt'), SideGuard)
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  /**
   * Create a new draft campaign.
   */
  @Post()
  create(
    @Request() req: any,
    @Body() data: { weddingId: string, sideId?: string, name: string, templateName: string, variables: any }
  ) {
    return this.campaignsService.create(req.user.id, data);
  }

  /**
   * Launch a campaign blast!
   */
  @Post(':id/launch')
  launch(@Param('id', ParseUUIDPipe) id: string) {
    return this.campaignsService.launch(id);
  }

  /**
   * List all campaigns for a specific wedding.
   */
  @Get()
  findAll(@Query('weddingId', ParseUUIDPipe) weddingId: string) {
    return this.campaignsService.findAllByWedding(weddingId);
  }
}
