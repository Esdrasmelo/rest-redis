import { faker } from '@faker-js/faker';
import { Users } from '@prisma/client';

export const usersSeeds = async (): Promise<Users[]> => {
  const users: Users[] = [];

  for (let index = 0; index <= Number(process.env.SEED_NUMBER); index++) {
    console.log(index);

    users.push({
      id: faker.datatype.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      gender: faker.name.gender(),
      age: faker.datatype.number({
        min: 1,
        max: 110,
      }),
      password: faker.internet.password(15),
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  return users;
};
