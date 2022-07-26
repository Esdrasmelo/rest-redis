import { Injectable } from '@nestjs/common';
import { Jobs } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JobsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(): Promise<Jobs[]> {
    try {
      return this.prismaService.jobs.findMany();
    } catch (error) {
      throw error;
    }
  }

  async getOne(id: string): Promise<Jobs> {
    try {
      return this.prismaService.jobs.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
