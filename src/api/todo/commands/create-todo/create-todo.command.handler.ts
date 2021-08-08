import { CreateTodoCommand } from './create-todo.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateTodoCommand)
export class CreateTodoHandler implements ICommandHandler<CreateTodoCommand> {
  execute(command: CreateTodoCommand): Promise<any> {
    return Promise.resolve(CreateTodoHandler.name);
  }
}
