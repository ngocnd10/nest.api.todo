import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { SharedModule } from './shared/shared.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filter';
import { TransformInterceptor } from './common/interceptor';

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
export class AppModule {}
