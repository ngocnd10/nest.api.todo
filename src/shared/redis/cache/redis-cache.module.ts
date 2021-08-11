import { Global, Module } from '@nestjs/common';
import { RedisModule } from '../index';
import { RedisCacheService } from './redis-cache.service';
import { AppConfig } from '@shared/app-config';
import { AppLogModule } from '@shared/app-log';

@Global()
@Module({
  imports: [
    RedisModule.forRootAsync({
      useFactory: configService => ({
        config: {
          host: configService.get('redis.host'),
          port: +configService.get('redis.port'),
          password: configService.get('redis.password'),
          db: +configService.get('redis.db'),
        },
      }),
      inject: [AppConfig],
    }),
    AppLogModule,
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}
