import { Body, Controller, Post } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class UsersController {

  constructor(private readonly usersService: UsersService) { }

  @Post('/signup')
  async create(@Body() body: CreateUserDto) {
    this.usersService.create(body.firstName, body.lastName, body.email, body.password);
  }

}
