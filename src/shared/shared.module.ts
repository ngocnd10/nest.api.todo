import { Module } from '@nestjs/common';
import { AppConfigModule } from './app-config';
import { DatabaseModule } from './database';
import { AppLogModule } from './app-log';

@Module({
  imports: [AppConfigModule, AppLogModule, DatabaseModule],
})
export class SharedModule {}
