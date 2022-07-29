import Redis from 'ioredis';

export class RedisService {
  private redisCient = new Redis({
    port: Number(process.env.REDIS_PORT),
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
  });

  async getKeyOnRedis(key: string): Promise<string> {
    return this.redisCient.get(key);
  }

  async setKeyOnRedis(key: string, data: string, ttl: number) {
    this.redisCient.set(key, data);
    this.redisCient.expire(key, ttl);
  }

  stringifyData(data: unknown) {
    return JSON.stringify(data);
  }

  parseDataFromRedis(data: string) {
    return JSON.parse(data, (property, value) => {
      if (property === 'created_at' || property === 'updated_at') {
        return new Date(value);
      }

      return value;
    });
  }
}
