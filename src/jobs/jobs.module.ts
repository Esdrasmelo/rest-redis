import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { JobsRepository } from './jobs.repository';
import { RedisService } from '../redis/redis.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [JobsController],
  providers: [JobsService, JobsRepository, RedisService, PrismaService],
})
export class JobsModule {}
