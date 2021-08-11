import { Module } from '@nestjs/common';
import { AppConfigModule } from './app-config';
import { DatabaseModule } from './database';
import { AppLogModule } from './app-log';
import { RedisCacheModule } from '@shared/redis';

@Module({
  imports: [AppConfigModule, AppLogModule, DatabaseModule, RedisCacheModule],
})
export class SharedModule {}
