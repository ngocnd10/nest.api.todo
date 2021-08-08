import { Module } from '@nestjs/common';
import { AppConfigModule } from './app-config';
import { DatabaseModule } from './database';
import { AppLogModule } from './app-log';
import { HealthModule } from './health';

@Module({
  imports: [AppConfigModule, AppLogModule, DatabaseModule, HealthModule],
})
export class SharedModule {}
