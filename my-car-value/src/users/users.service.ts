import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './users.entity';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private repo: Repository<User>) { }

  create(firstName: string, lastName: string, email: string, password: string) {
    const user = this.repo.create({ firstName, lastName, email, password });
    return this.repo.save(user);
  }

  async findOne(id: number) {
    const user = await this.repo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findAll() {
    const users = await this.repo.find({});
    return users;
  }

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>) {

    const user = await this.repo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, attrs);
    return this.repo.save(user);

  }

  async remove(id: number) {
    const user = await this.repo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.repo.remove(user);
  }

}
