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

  async findAllUsers(): Promise<Omit<Users, 'password'>[]> {
    try {
      const users = (await this.userRepository.getAll()).map(
        ({ password, ...user }) => user,
      );

      return users;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAllUsersOnRedis(): Promise<Omit<Users, 'password'>[]> {
    try {
      const getUsersKeyOnRedis = await this.redisService.getKeyOnRedis(
        'allUsers',
      );

      if (!getUsersKeyOnRedis) {
        const users = (await this.userRepository.getAll()).map(
          ({ password, ...user }) => user,
        );
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

  async findOneUser(id: string): Promise<Omit<Users, 'password'>> {
    try {
      const { password, ...user } = await this.userRepository.getOne(id);

      return user;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
