import { UpdateTodoCommand } from './update-todo.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoDto } from '../../dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Todo } from '../../entities';
import { AppLog } from '@shared/app-log';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoRepository } from '../../repository';
import { isNil } from 'lodash';

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
    const { body, id, title } = command.props;

    let todo = await this.todoRepository.findOne(id);

    if (isNil(todo)) {
      this.appLog.error({
        message: 'The record is not found',
        error: 'Not Found',
      });
      throw new NotFoundException({
        message: 'The record is not found',
        error: 'Not Found',
      });
    }

    if (isNil(title) && isNil(body)) {
      this.appLog.error({
        message: 'The title and body are not defined',
        error: 'Bad Request',
      });
      throw new BadRequestException({
        message: 'The title and body are not defined',
        error: 'Bad Request',
      });
    }
    todo = { ...todo, title, body } as Todo;
    await this.todoRepository.update(id, todo);

    return plainToClass(TodoDto, todo, { excludeExtraneousValues: true });
  }
}
