import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppConfig } from '@shared/app-config';
import { AppLog } from '@shared/app-log';

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

  const config = new DocumentBuilder()
    .setTitle('Todo App')
    .setDescription('The todo API description')
    .setVersion(appConfig.version)
    .addBearerAuth()
    .addServer(`${url}/${apiPrefix}`)
    .build();
  const options: SwaggerDocumentOptions = {
    ignoreGlobalPrefix: true,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(port);
  appLog.log(`Server is listen on ${url}`);
}
