import { RemoveTodoCommand } from './remove-todo.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppLog } from '@shared/app-log';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoRepository } from '../../repository';
import { DeleteResult } from 'typeorm';

@CommandHandler(RemoveTodoCommand)
export class RemoveTodoHandler implements ICommandHandler<RemoveTodoCommand> {
  constructor(
    private appLog: AppLog,
    @InjectRepository(TodoRepository)
    private readonly todoRepository: TodoRepository,
  ) {
    appLog.setContextAndFileName(RemoveTodoHandler.name, __filename);
  }

  execute(command: RemoveTodoCommand): Promise<DeleteResult> {
    return this.todoRepository.delete(command.id);
  }
}
