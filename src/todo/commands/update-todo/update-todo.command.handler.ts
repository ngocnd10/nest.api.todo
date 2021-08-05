import { UpdateTodoCommand } from './update-todo.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(UpdateTodoCommand)
export class UpdateTodoHandler implements ICommandHandler<UpdateTodoCommand> {
  execute(command: UpdateTodoCommand): Promise<any> {
    return Promise.resolve(UpdateTodoHandler.name);
  }
}
