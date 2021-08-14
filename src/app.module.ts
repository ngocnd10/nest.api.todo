import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ApiModule } from '@api/api.module';
import { AllExceptionFilter } from '@common/filter';
import { TransformInterceptor } from '@common/interceptor';
import { GeneratePermissionCodeMiddleware, GenerateRequestIdMiddleware } from '@common/midddleware';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [SharedModule, ApiModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
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
