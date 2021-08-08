import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { SharedModule } from './shared';
import { ApiModule } from './api';
import {
  GeneratePermissionCodeMiddleware,
  GenerateRequestIdMiddleware,
  HttpExceptionFilter,
  TransformInterceptor,
  ValidationPipe,
} from './common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

@Module({
  imports: [SharedModule, ApiModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(GenerateRequestIdMiddleware, GeneratePermissionCodeMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
