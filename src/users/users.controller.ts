import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/redis')
  findAllUsersOnRedis(): Promise<Users[]> {
    return this.usersService.findAllUsersOnRedis();
  }

  @Get('/')
  findAllUsers(): Promise<Users[]> {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  findOneUser(@Param('id') id: string): Promise<Users> {
    return this.usersService.findOneUser(id);
  }
}
