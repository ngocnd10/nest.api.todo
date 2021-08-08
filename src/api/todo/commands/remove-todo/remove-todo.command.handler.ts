import { RemoveTodoCommand } from './remove-todo.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(RemoveTodoCommand)
export class RemoveTodoHandler implements ICommandHandler<RemoveTodoCommand> {
  execute(command: RemoveTodoCommand): Promise<any> {
    return Promise.resolve(RemoveTodoHandler.name);
  }
}
