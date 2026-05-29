import { Injectable } from '@nestjs/common';

import { MessagesRepository } from './messages.repository';

@Injectable()
export class MessagesService {

  messagesRepository: MessagesRepository;

  constructor() {
    // Temporary solution until we implement dependency injection
    this.messagesRepository = new MessagesRepository();
  }

  async findOne(id: string) {
    return this.messagesRepository.findOne(id);
  }

  async findAll() {
    return this.messagesRepository.findAll();
  }

  async create(message: string) {
    return this.messagesRepository.create(message);
  }

}