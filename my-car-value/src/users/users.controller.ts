import { Body, Controller, Post, Get, Patch, Param, Query, Delete } from '@nestjs/common';

import { UsersService } from './users.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('auth')
export class UsersController {

  constructor(private readonly usersService: UsersService) { }

  @Post('/signup')
  create(@Body() body: CreateUserDto) {
    this.usersService.create(body.firstName, body.lastName, body.email, body.password);
  }

  @Get('/:id')
  findUserById(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id));
  }

  @Get('/users')
  findAllUsers() {
    return this.usersService.findAll();
  }

  @Get()
  findUserByEmail(@Query('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

}