import { Module } from '@nestjs/common';
import { AppLog } from './app-log.service';

@Module({
  providers: [AppLog],
  exports: [AppLog],
})
export class AppLogModule {}
