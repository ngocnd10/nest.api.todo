import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTodoQuery } from './get-todo.query';
import { TodoDto } from '../../dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoRepository } from '../../repository';
import { plainToClass } from 'class-transformer';
import { NotFoundException } from '@nestjs/common';
import { isNil } from 'lodash';
import { AppLog } from '@shared/app-log';

@QueryHandler(GetTodoQuery)
export class GetTodoHandler implements IQueryHandler<GetTodoQuery> {
  constructor(
    private appLog: AppLog,
    @InjectRepository(TodoRepository)
    private readonly todoRepository: TodoRepository,
  ) {
    appLog.setContextAndFileName(GetTodoHandler.name, __filename);
  }

  async execute(query: GetTodoQuery): Promise<TodoDto> {
    const todo = await this.todoRepository.findOne(query.id);

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

    return plainToClass(TodoDto, todo, { excludeExtraneousValues: true });
  }
}
