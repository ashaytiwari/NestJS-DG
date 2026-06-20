import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

import { UsersService } from "./users.service";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {

  constructor(private readonly usersService: UsersService) { }

  async signup(firstName: string, lastName: string, email: string, password: string) {

    // Check if user with the same email already exists
    const user = await this.usersService.findByEmail(email);

    if (user) {
      throw new BadRequestException('User with this email already exists');
    }

    // Hash the password before saving it to the database
    // 1. Generate a salt
    const salt = randomBytes(8).toString('hex');

    // 2. Hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // 3. Join the hashed result and the salt together
    const result = salt + '.' + hash.toString('hex');

    // Create a new user and save it to the database
    return this.usersService.create(firstName, lastName, email, result);

  }

  async signin(email: string, password: string) {

    // Check if user with the same email exists or not
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('User with this email does not exist');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new ForbiddenException('Invalid password');
    }

    return user;

  }

}