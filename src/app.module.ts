import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { SharedModule } from './shared/shared.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [SharedModule, HealthModule, TodoModule],
})
export class AppModule {}
