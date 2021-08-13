import { Module } from '@nestjs/common';
import { AppConfigModule } from './app-config';
import { DatabaseModule } from './database';
import { AppLogModule } from './app-log';
import { RedisCacheModule } from '@shared/redis';
import { RestClientModule } from '@shared/rest';

@Module({
  imports: [AppConfigModule, AppLogModule, DatabaseModule, RedisCacheModule, RestClientModule],
})
export class SharedModule {}
