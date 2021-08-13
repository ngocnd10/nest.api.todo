import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod } from '@nestjs/common';
import { AppConfig } from '@shared/app-config';
import { AppLog } from '@shared/app-log';
import { ValidationPipe } from '@common/pipe';
import { configSwagger } from './swagger.config';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get(AppConfig);
  const appLog = new AppLog(__filename, 'bootstrap');

  const host = appConfig.get<string>('http.host');
  const port = Number(process.env.PORT_HTTP) || appConfig.get<string>('http.port');
  const apiPrefix = appConfig.get<string>('api.prefix');
  const url = `${process.env.NODE_ENVIRONMENT ? 'https' : 'http'}://${host}:${port}`;

  app.setGlobalPrefix(apiPrefix, {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });
  app.enableVersioning();
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  configSwagger(app, { version: appConfig.version, url, apiPrefix });

  await app.listen(port);
  appLog.log(`Server is listen on ${url}`);
}
