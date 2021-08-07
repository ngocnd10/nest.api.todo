import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod } from '@nestjs/common';
import { AppConfig } from './shared';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get(AppConfig);

  const apiPrefix = appConfig.get<string>('api.prefix');
  app.setGlobalPrefix(apiPrefix, {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });
  app.enableVersioning();
  app.enableCors();

  const port = appConfig.get<string>('http.port');
  await app.listen(port);
}
bootstrap();
