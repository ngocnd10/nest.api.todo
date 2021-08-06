import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod } from '@nestjs/common';
// import { AppConfig } from './shared';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const appConfig = app.get(AppConfig);

  app.setGlobalPrefix('api', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });
  app.enableVersioning();
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
