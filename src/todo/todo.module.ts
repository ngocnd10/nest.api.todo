import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TodoController } from './todo.controller';
import { queryHandlers } from './queries';
import { commandHandlers } from './commands';

@Module({
  imports: [CqrsModule],
  controllers: [TodoController],
  providers: [...queryHandlers, ...commandHandlers],
})
export class TodoModule {}
