import { CreateTodoCommand } from './create-todo.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoRepository } from '../../repository';
import { AppLog } from '../../../../shared';
import { plainToClass } from 'class-transformer';
import { Todo } from '../../entities';
import { TodoDto } from '../../dto';
import { isNil } from '@nestjs/common/utils/shared.utils';

@CommandHandler(CreateTodoCommand)
export class CreateTodoHandler implements ICommandHandler<CreateTodoCommand> {
  constructor(
    private appLog: AppLog,
    @InjectRepository(TodoRepository)
    private readonly todoRepository: TodoRepository,
  ) {
    appLog.setContextAndFileName(CreateTodoHandler.name, __filename);
  }

  async execute(command: CreateTodoCommand): Promise<TodoDto> {
    const { title, body } = command.props;

    if (isNil(title) && isNil(body)) {
      this.appLog.error('The title and body are not defined');
      return null;
    }

    const todo = Object.assign(new Todo(), { title, body });
    const entity = await this.todoRepository.save(todo);

    return plainToClass(TodoDto, entity, { excludeExtraneousValues: true });
  }
}
