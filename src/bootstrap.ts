import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod } from '@nestjs/common';
import { AppConfig, AppLog } from './shared';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get(AppConfig);

  const apiPrefix = appConfig.get<string>('api.prefix');
  app.setGlobalPrefix(apiPrefix, {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });
  app.enableVersioning();
  app.enableCors();

  const appLog = new AppLog(__filename, 'bootstrap');

  const port =
    Number(process.env.PORT_HTTP) || appConfig.get<string>('http.port');
  await app.listen(port);
  appLog.log(`Server is listen on ${port}`);
}
