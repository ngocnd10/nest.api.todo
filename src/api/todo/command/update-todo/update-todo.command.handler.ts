import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { AppLog } from '@shared/app-log';
import { TodoDto } from '../../dto';
import { Todo } from '../../entity';
import { TodoRepository } from '../../repository';
import { UpdateTodoCommand } from './update-todo.command';
import { LodashHelper } from '@common/helper';
import { ERROR } from '@common/constant';

@CommandHandler(UpdateTodoCommand)
export class UpdateTodoHandler implements ICommandHandler<UpdateTodoCommand> {
  constructor(
    private appLog: AppLog,
    @InjectRepository(TodoRepository)
    private readonly todoRepository: TodoRepository,
  ) {
    appLog.setContextAndFileName(UpdateTodoHandler.name, __filename);
  }

  async execute(command: UpdateTodoCommand): Promise<TodoDto> {
    const { body, title, updatedBy } = command.props;
    const { id } = command;

    let todo = await this.todoRepository.findOne(id);

    if (LodashHelper.isNil(todo)) {
      this.appLog.error('The todo is not found');
      throw new NotFoundException(ERROR.TODO_NOT_FOUND);
    }

    todo = { ...todo, title, body, updatedBy } as Todo;
    const entity = await this.todoRepository.save(todo);

    return plainToClass(TodoDto, entity, { excludeExtraneousValues: true });
  }
}
