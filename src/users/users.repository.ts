import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    try {
      return this.prismaService.users.findMany();
    } catch (error) {
      throw error;
    }
  }

  async getOne(id: string) {
    try {
      return this.prismaService.users.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
