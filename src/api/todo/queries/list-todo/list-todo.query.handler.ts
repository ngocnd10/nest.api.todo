import { ListTodoQuery } from './list-todo.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TodoRepository } from '../../repository';
import { InjectRepository } from '@nestjs/typeorm';
import { BasePageable } from '../../../../common';
import { TodoDto } from '../../dto';
import { plainToClass } from 'class-transformer';

@QueryHandler(ListTodoQuery)
export class ListTodoHandler implements IQueryHandler<ListTodoQuery> {
  constructor(
    @InjectRepository(TodoRepository)
    private readonly todoRepository: TodoRepository,
  ) {}

  async execute(query: ListTodoQuery): Promise<BasePageable<TodoDto>> {
    const { page = 0, limit } = query.props;
    const [todos, total] = await this.todoRepository.getAllAndCount(query);
    const items = plainToClass(TodoDto, todos, {
      excludeExtraneousValues: true,
    });
    return {
      items,
      page,
      limit: limit || Number.MAX_VALUE,
      total,
    } as BasePageable<TodoDto>;
  }
}
