import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TodoController } from './todo.controller';
import { queryHandlers } from './queries';
import { commandHandlers } from './commands';
import { AppLogModule } from '../../shared/app-log';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoRepository } from './repository';

@Module({
  imports: [
    CqrsModule,
    AppLogModule,
    TypeOrmModule.forFeature([TodoRepository]),
  ],
  controllers: [TodoController],
  providers: [...queryHandlers, ...commandHandlers],
})
export class TodoModule {}
