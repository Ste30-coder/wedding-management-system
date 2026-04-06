import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { GuestsService } from './guests.service';
import { GuestUploadService } from './guest-upload.service';
import { GuestsController } from './guests.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule, 
    MulterModule.register({ limits: { fileSize: 5 * 1024 * 1024 } })
  ],
  controllers: [GuestsController],
  providers: [GuestsService, GuestUploadService],
  exports: [GuestsService],
})
export class GuestsModule {}
