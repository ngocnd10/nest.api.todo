import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TodoController } from './todo.controller';
import { queryHandlers } from './query';
import { commandHandlers } from './command';
import { AppLogModule } from '@shared/app-log';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoRepository } from './repository';
import { TodoService } from './todo.service';

@Module({
  imports: [CqrsModule, AppLogModule, TypeOrmModule.forFeature([TodoRepository])],
  controllers: [TodoController],
  providers: [...queryHandlers, ...commandHandlers, TodoService],
})
export class TodoModule {}
