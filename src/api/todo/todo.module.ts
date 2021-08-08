import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TodoController } from './todo.controller';
import { queryHandlers } from './queries';
import { commandHandlers } from './commands';
import { LoggerModule } from '../../shared/logger';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoRepository } from './repository';

@Module({
  imports: [
    CqrsModule,
    LoggerModule,
    TypeOrmModule.forFeature([TodoRepository]),
  ],
  controllers: [TodoController],
  providers: [...queryHandlers, ...commandHandlers],
})
export class TodoModule {}
