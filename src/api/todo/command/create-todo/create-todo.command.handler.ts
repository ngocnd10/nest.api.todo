import { CreateTodoCommand } from './create-todo.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoRepository } from '../../repository';
import { AppLog } from '@shared/app-log';
import { plainToClass } from 'class-transformer';
import { TodoDto } from '../../dto';
import { LodashHelper } from '@common/helper';

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
    const { body, createdBy, title } = command.props;

    if (LodashHelper.isNil(title) && LodashHelper.isNil(body)) {
      this.appLog.error('The title and body are not defined');
      return null;
    }

    const entity = await this.todoRepository.createTodo({ title, body, createdBy });

    return plainToClass(TodoDto, entity, { excludeExtraneousValues: true });
  }
}
