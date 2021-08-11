import { Inject } from '@nestjs/common';
import { getRedisConnectionToken } from './redis.util';

export const InjectRedis = (connection?: string) => {
  return Inject(getRedisConnectionToken(connection));
};
