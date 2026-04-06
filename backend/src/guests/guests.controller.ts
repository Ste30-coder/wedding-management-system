import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards, 
  Query, 
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  Res,
  BadRequestException
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { GuestsService } from './guests.service';
import { GuestUploadService } from './guest-upload.service';
import { CreateGuestDto } from './dto/create-guest.dto';
import { SideGuard } from '../guards/side.guard';

@Controller('guests')
@UseGuards(AuthGuard('jwt'), SideGuard)
export class GuestsController {
  constructor(
    private readonly guestsService: GuestsService,
    private readonly guestUploadService: GuestUploadService
  ) {}

  @Get('upload/template')
  async downloadTemplate(@Res() res: any) {
    const buffer = await this.guestsService.generateTemplateBuffer();
    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename=wedding_guest_template.xlsx',
    });
    res.end(buffer);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: any,
    @Query('weddingId', new ParseUUIDPipe()) weddingId: string,
    @Query('sideId', new ParseUUIDPipe({ optional: true })) sideId?: string,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded.');
    }
    // Handle 'undefined' string from frontend
    if (weddingId === 'undefined' || weddingId === 'null') {
      throw new BadRequestException('A valid Wedding UUID is required.');
    }
    return this.guestUploadService.processExcel(file.buffer, weddingId, sideId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createGuestDto: CreateGuestDto) {
    return this.guestsService.create(createGuestDto);
  }

  @Get()
  findAll(
    @Query('weddingId', ParseUUIDPipe) weddingId: string,
    @Query('sideId', new ParseUUIDPipe({ optional: true })) sideId?: string,
  ) {
    return this.guestsService.findAll(weddingId, sideId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.guestsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateGuestDto: Partial<CreateGuestDto>
  ) {
    return this.guestsService.update(id, updateGuestDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.guestsService.remove(id);
  }
}
