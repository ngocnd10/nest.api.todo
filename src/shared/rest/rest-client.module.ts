import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { AppConfig } from '../app-config';
import { restProviders } from './service';

@Global()
@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: async configService => ({
        timeout: configService.get('http.timeout'),
        maxRedirects: configService.get('http.max-redirects'),
      }),
      inject: [AppConfig],
    }),
  ],
  providers: [...restProviders],
  exports: [...restProviders],
})
export class RestClientModule {}
