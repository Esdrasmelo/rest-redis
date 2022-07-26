import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Users } from '@prisma/client';
import { RedisService } from '../redis/redis.service';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly redisService: RedisService,
  ) {}

  async findAllUsers(): Promise<Users[]> {
    try {
      const users = await this.userRepository.getAll();

      return users;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAllUsersOnRedis(): Promise<Users[]> {
    try {
      const getUsersKeyOnRedis = await this.redisService.getKeyOnRedis(
        'allUsers',
      );

      if (!getUsersKeyOnRedis) {
        const users = await this.userRepository.getAll();
        const stringifyUsersData = this.redisService.stringifyData(users);

        this.redisService.setKeyOnRedis('allUsers', stringifyUsersData, 200);

        return users;
      }

      const usersReturn =
        this.redisService.parseDataFromRedis(getUsersKeyOnRedis);

      return usersReturn;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOneUser(id: string) {
    try {
      return this.userRepository.getOne(id);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
