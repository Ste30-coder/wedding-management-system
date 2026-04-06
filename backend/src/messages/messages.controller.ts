import { Controller, Post, Body } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) {}

    @Post('send-single')
    async sendSingle(@Body('guestId') guestId: string) {
        return this.messagesService.sendSingle(guestId);
    }
}
