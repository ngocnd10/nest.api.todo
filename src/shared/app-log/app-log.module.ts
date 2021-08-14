import { Global, Module } from '@nestjs/common';
import { AppLog } from './app-log';

@Global()
@Module({
  providers: [AppLog],
  exports: [AppLog],
})
export class AppLogModule {}
