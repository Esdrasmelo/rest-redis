import { Jobs } from '@prisma/client';
import { faker } from '@faker-js/faker';

export const jobsSeeds = async (): Promise<Jobs[]> => {
  const jobs: Jobs[] = [];

  for (let index = 0; Number(process.env.SEED_NUMBER); index++) {
    jobs.push({
      id: faker.datatype.uuid(),
      name: faker.name.jobTitle(),
      job_area: faker.name.jobArea(),
      job_type: faker.name.jobType(),
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  return jobs;
};
