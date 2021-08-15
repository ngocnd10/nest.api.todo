import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTodoQuery } from './get-todo.query';
import { TodoDto } from '../../dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoRepository } from '../../repository';
import { NotFoundException } from '@nestjs/common';
import { AppLog } from '@shared/app-log';
import { LodashHelper, MapHelper } from '@common/helper';
import { ERROR } from '@common/constant';

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

    if (LodashHelper.isNil(todo)) {
      this.appLog.error('The todo is not found', query);
      throw new NotFoundException(ERROR.TODO_NOT_FOUND);
    }

    return MapHelper.mapToDTO(TodoDto, todo);
  }
}
