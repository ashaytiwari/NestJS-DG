import { Controller, Get, Post, Body, Param, NotFoundException, ForbiddenException } from '@nestjs/common';

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
  async getMessageById(@Param('id') id: string) {
    const message = await this.messagesService.findOne(id);

    if (!message) {
      throw new ForbiddenException(`Message with id ${id} not found`);
    }

    return message;
  }

}
