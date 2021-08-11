import * as Redis from 'ioredis';
import { RedisModuleOptions } from '../interface';
import { REDIS_MODULE_CONNECTION, REDIS_MODULE_CONNECTION_TOKEN, REDIS_MODULE_OPTIONS_TOKEN } from '../redis.constant';

export function getRedisOptionsToken(connection: string): string {
  return `${connection || REDIS_MODULE_CONNECTION}_${REDIS_MODULE_OPTIONS_TOKEN}`;
}

export function getRedisConnectionToken(connection: string): string {
  return `${connection || REDIS_MODULE_CONNECTION}_${REDIS_MODULE_CONNECTION_TOKEN}`;
}

export function createRedisConnection(options: RedisModuleOptions) {
  const { config } = options;
  return new Redis(config);
}
