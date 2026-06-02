import { Injectable } from '@nestjs/common';

import { MessagesRepository } from './messages.repository';

@Injectable()
export class MessagesService {

  constructor(public messagesRepository: MessagesRepository) { }

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