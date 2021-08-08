import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod } from '@nestjs/common';
import { AppConfig, AppLog } from './shared';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get(AppConfig);
  const appLog = new AppLog(__filename, 'bootstrap');

  const host = appConfig.get<string>('http.host');
  const port = Number(process.env.PORT_HTTP) || appConfig.get<string>('http.port');
  const apiPrefix = appConfig.get<string>('api.prefix');

  app.setGlobalPrefix(apiPrefix, {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });
  app.enableVersioning();
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Todo App')
    .setDescription('The todo API description')
    .setVersion(process.env.npm_package_version)
    .addBearerAuth()
    .addServer(`http://${host}:${port}/${apiPrefix}`)
    .build();
  const options: SwaggerDocumentOptions = {
    ignoreGlobalPrefix: true,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(port);
  appLog.log(`Server is listen on ${port}`);
}
