import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { readFile, writeFile } from 'fs/promises';

import { v4 as uuidv4 } from "uuid";

@Injectable()
export class MessagesRepository {

  async findOne(id: string) {
    const fileContent = await readFile('messages.json', 'utf-8');
    const messages = JSON.parse(fileContent);

    return messages[id];
  }

  async findAll() {
    const fileContent = await readFile('messages.json', 'utf-8');
    const messages = JSON.parse(fileContent);

    return messages;
  }

  async create(message: string) {
    const id = uuidv4();

    const fileContent = await readFile('messages.json', 'utf-8');
    const messages = JSON.parse(fileContent);

    messages[id] = { id, content: message };

    await writeFile('messages.json', JSON.stringify(messages));

    return messages[id];
  }

}