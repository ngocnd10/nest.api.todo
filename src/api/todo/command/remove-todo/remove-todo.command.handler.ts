import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import { AppLog } from '@shared/app-log';
import { TodoRepository } from '../../repository';
import { RemoveTodoCommand } from './remove-todo.command';

@CommandHandler(RemoveTodoCommand)
export class RemoveTodoHandler implements ICommandHandler<RemoveTodoCommand> {
  constructor(
    private appLog: AppLog,
    @InjectRepository(TodoRepository)
    private readonly todoRepository: TodoRepository,
  ) {
    appLog.setContextAndFileName(RemoveTodoHandler.name, __filename);
  }

  async execute(command: RemoveTodoCommand): Promise<boolean> {
    const rs: DeleteResult = await this.todoRepository.delete(command.id);
    return !!rs.affected;
  }
}
