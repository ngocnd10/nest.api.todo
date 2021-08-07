import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { SharedModule } from './shared/shared.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filter';
import { TransformInterceptor } from './common/interceptor';
import { GeneratePermissionCodeMiddleware, GenerateRequestIdMiddleware } from './common/midddleware';

@Module({
  imports: [SharedModule, TodoModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
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
