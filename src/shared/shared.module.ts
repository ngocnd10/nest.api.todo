import { Module } from '@nestjs/common';
import { AppConfigModule } from './app-config';
import { DatabaseModule } from './database';
import { LoggerModule } from './logger';
import { HealthModule } from './health';

@Module({
  imports: [AppConfigModule, LoggerModule, DatabaseModule, HealthModule],
})
export class SharedModule {}
