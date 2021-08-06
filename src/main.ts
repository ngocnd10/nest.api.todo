import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfig } from './shared';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfig = app.get(AppConfig);

  await app.listen(3000);
}
bootstrap();
