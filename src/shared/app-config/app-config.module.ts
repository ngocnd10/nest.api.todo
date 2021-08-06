import { Global, Module } from '@nestjs/common';
import { AppConfig } from './app-config';

const configProvider = {
  provide: AppConfig,
  useFactory: async (): Promise<any> => {
    return AppConfig.load();
  },
};

@Global()
@Module({
  providers: [configProvider],
  exports: [configProvider],
})
export class AppConfigModule {}
