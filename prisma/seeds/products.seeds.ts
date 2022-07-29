import { faker } from '@faker-js/faker';
import { Products } from '@prisma/client';

export const productsSeeds = async (): Promise<Products[]> => {
  const products: Products[] = [];

  for (let index = 0; index <= Number(process.env.SEED_NUMBER); index++) {
    products.push({
      id: faker.datatype.uuid(),
      name: faker.commerce.product(),
      color: faker.color.human(),
      price: faker.commerce.price(),
      description: faker.commerce.productDescription(),
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  return products;
};
