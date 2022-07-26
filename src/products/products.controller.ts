import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Products } from '@prisma/client';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('redis')
  findAllProductsOnRedis(): Promise<Products[]> {
    return this.productsService.findAllProductsOnRedis();
  }

  @Get('/')
  findAllProducts(): Promise<Products[]> {
    return this.productsService.findAllProducts();
  }

  @Get(':id')
  findOneProduct(@Param('id') id: string): Promise<Products> {
    return this.productsService.findOneProduct(id);
  }
}
