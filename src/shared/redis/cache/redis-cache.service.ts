import { Injectable } from '@nestjs/common';
import IORedis from 'ioredis';
import { InjectRedis } from '../common';
import { Redis } from '../interface';
import { AppLog } from '@shared/app-log';
import { AppConfig } from '@shared/app-config';

@Injectable()
export class RedisCacheService {
  private prefix: string;
  private ttl: number;

  constructor(@InjectRedis() private readonly redis: Redis, private appLog: AppLog, private appConfig: AppConfig) {
    this.prefix = this.appConfig.get('redis.prefix') || '';
    this.ttl = Number(this.appConfig.get('redis.ttl')) || 300;
  }

  async get(key: IORedis.KeyType) {
    key = this.prefix + key;
    try {
      const rs = await this.redis.get(key);
      return JSON.parse(rs);
    } catch (e) {
      this.appLog.error('Error when get cached with key: ', key);
    }
  }

  async set(key: IORedis.KeyType, value: IORedis.ValueType, ttl = this.ttl) {
    key = this.prefix + key;
    try {
      await this.redis.set(key, JSON.stringify(value));
      if (ttl > 0) {
        await this.redis.expire(key, ttl);
      }
    } catch (e) {
      this.appLog.error('Error when set cached with key: ', key);
    }
  }

  async del(key: IORedis.KeyType) {
    key = this.prefix + key;
    try {
      await this.redis.del(key);
    } catch (e) {
      this.appLog.error('Error: Could not del key: ', key);
    }
  }

  async delPattern(key: IORedis.KeyType) {
    const delKey = `${this.prefix}${key}*`;
    try {
      const keys = await this.redis.keys(delKey);
      await Promise.all(keys.map(k => this.redis.del(k)));
    } catch (e) {
      this.appLog.error('Error: Could not del pattern key: ', delKey);
    }
  }

  async incr(key: IORedis.KeyType, ttl = this.ttl) {
    key = this.prefix + key;
    if (ttl > 0) {
      try {
        await this.redis.incr(key);
      } catch (e) {
        this.appLog.error('Error: Could not incr key: ', key);
      }
    }
  }

  async exists(key: IORedis.KeyType) {
    key = this.prefix + key;
    try {
      return await this.redis.exists(key);
    } catch (e) {
      this.appLog.error('Error when check key exist: ', key);
    }
  }
}
