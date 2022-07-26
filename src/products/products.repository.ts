import { Injectable } from '@nestjs/common';
import { Products } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(): Promise<Products[]> {
    try {
      return this.prismaService.products.findMany();
    } catch (error) {
      throw error;
    }
  }

  async getOne(id: string): Promise<Products> {
    try {
      return this.prismaService.products.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
