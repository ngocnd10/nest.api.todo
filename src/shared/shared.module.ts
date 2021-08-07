import { Module } from '@nestjs/common';
import { AppConfigModule } from './app-config';
import { DatabaseModule } from './database';
import { LoggerModule } from './logger';

@Module({
  imports: [
    AppConfigModule,
    LoggerModule,
    DatabaseModule,
  ],
})
export class SharedModule {}
