import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Jobs } from '@prisma/client';
import { RedisService } from '../redis/redis.service';
import { JobsRepository } from './jobs.repository';

@Injectable()
export class JobsService {
  constructor(
    private readonly jobsRepository: JobsRepository,
    private readonly redisService: RedisService,
  ) {}

  async findAllJobsOnRedis(): Promise<Jobs[]> {
    try {
      const getJobsKeyOnRedis = await this.redisService.getKeyOnRedis(
        'allJobs',
      );

      if (!getJobsKeyOnRedis) {
        const jobs = await this.jobsRepository.getAll();
        const stringifyJobs = this.redisService.stringifyData(jobs);

        this.redisService.setKeyOnRedis('allJobs', stringifyJobs, 300);

        return jobs;
      }

      const jobsReturn =
        this.redisService.parseDataFromRedis(getJobsKeyOnRedis);

      return jobsReturn;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  findAllJobs(): Promise<Jobs[]> {
    try {
      return this.jobsRepository.getAll();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  findOneJob(id: string): Promise<Jobs> {
    try {
      return this.jobsRepository.getOne(id);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
