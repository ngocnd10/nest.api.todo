import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { AppConfigModule } from './app-config/app-config.module';

@Module({
  imports: [AppConfigModule, HealthModule],
})
export class SharedModule {}
