import { Module } from '@nestjs/common';
import { HealthModule } from './health';
import { AppConfigModule } from './app-config';
import { DatabaseModule } from './database';
import { LoggerModule } from './logger';

@Module({
  imports: [
    AppConfigModule,
    LoggerModule,
    HealthModule,
    //DatabaseModule,
  ],
})
export class SharedModule {}
