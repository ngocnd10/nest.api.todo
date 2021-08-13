import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';

export interface ISwaggerData {
  version: string;
  url: string;
  apiPrefix: string;
}

export const configSwagger = (app: INestApplication, data: ISwaggerData) => {
  const config = new DocumentBuilder()
    .setTitle('Todo App')
    .setDescription('The todo API description')
    .setVersion(data.version)
    .addBearerAuth()
    .addServer(`${data.url}/${data.apiPrefix}`)
    .build();
  const options: SwaggerDocumentOptions = {
    ignoreGlobalPrefix: true,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('swagger', app, document);
};
