import { Controller, Get, Param } from '@nestjs/common';
import { Jobs } from '@prisma/client';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get('/redis')
  findAllJobsOnRedis(): Promise<any> {
    return this.jobsService.findAllJobsOnRedis();
  }

  @Get('/')
  findAllJobs(): Promise<Jobs[]> {
    return this.jobsService.findAllJobs();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Jobs> {
    return this.jobsService.findOneJob(id);
  }
}
