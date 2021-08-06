import { Module } from '@nestjs/common';
import { HealthModule } from './health';
import { AppConfigModule } from './app-config';
import { DatabaseModule } from './database';

@Module({
  imports: [AppConfigModule, HealthModule, DatabaseModule],
})
export class SharedModule {}
