import { Controller, Get, Post, Body, Param } from '@nestjs/common';

import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {

  messagesService: MessagesService;

  constructor() {
    // Temporary solution until we implement dependency injection
    this.messagesService = new MessagesService();
  }

  @Get()
  listMessages() {
    return this.messagesService.findAll();
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    return this.messagesService.create(body.content);
  }

  @Get('/:id')
  getMessageById(@Param('id') id: string) {
    return this.messagesService.findOne(id);
  }

}
