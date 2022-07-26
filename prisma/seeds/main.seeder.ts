import { PrismaService } from '../../src/prisma/prisma.service';
import { jobsSeeds } from './jobs.seeds';
import { productsSeeds } from './products.seeds';
import { usersSeeds } from './users.seeds';

export class MainSeeder {
  constructor(private readonly prismaService: PrismaService) {}

  async main() {
    const users = await usersSeeds();
    const jobs = await jobsSeeds();
    const products = await productsSeeds();

    await this.prismaService.users.createMany({
      data: users,
    });
    await this.prismaService.jobs.createMany({
      data: jobs,
    });
    await this.prismaService.products.createMany({
      data: products,
    });
  }
}

const prismaService = new PrismaService();

new MainSeeder(prismaService).main();
