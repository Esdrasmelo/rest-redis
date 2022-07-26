import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Products } from '@prisma/client';
import { RedisService } from '../redis/redis.service';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly redisService: RedisService,
  ) {}

  async findAllProductsOnRedis(): Promise<Products[]> {
    try {
      const getProductsKeyOnRedis = await this.redisService.getKeyOnRedis(
        'allProducts',
      );

      if (!getProductsKeyOnRedis) {
        const products = await this.productsRepository.getAll();
        const stringifyProductsData = this.redisService.stringifyData(products);

        this.redisService.setKeyOnRedis(
          'allProducts',
          stringifyProductsData,
          300,
        );

        return products;
      }

      const productsReturn = this.redisService.parseDataFromRedis(
        getProductsKeyOnRedis,
      );

      return productsReturn;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAllProducts(): Promise<Products[]> {
    try {
      return this.productsRepository.getAll();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOneProduct(id: string): Promise<Products> {
    try {
      return this.productsRepository.getOne(id);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
