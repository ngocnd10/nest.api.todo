import { ListTodoQuery } from './list-todo.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TodoRepository } from '../../repository';
import { InjectRepository } from '@nestjs/typeorm';
import { BasePageable } from '@common/model';
import { TodoDto } from '../../dto';
import { MapHelper } from '@common/helper';

@QueryHandler(ListTodoQuery)
export class ListTodoHandler implements IQueryHandler<ListTodoQuery> {
  constructor(
    @InjectRepository(TodoRepository)
    private readonly todoRepository: TodoRepository,
  ) {}

  async execute(query: ListTodoQuery): Promise<BasePageable<TodoDto>> {
    const { limit, page = 0 } = query.props;
    const [todos, total] = await this.todoRepository.getAllAndCount(query);
    const items = MapHelper.mapToDTOs(TodoDto, todos);
    return {
      items,
      page,
      limit: limit || Number.MAX_VALUE,
      total,
    } as BasePageable<TodoDto>;
  }
}
