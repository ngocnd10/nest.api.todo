import { GetTodosQuery } from './get-todos.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TodoRepository } from '../../repository/todo.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { BasePageable } from '../../../../common';
import { TodoDto } from '../../dto';
import { plainToClass } from 'class-transformer';

@QueryHandler(GetTodosQuery)
export class GetTodosHandler implements IQueryHandler<GetTodosQuery> {
  constructor(
    @InjectRepository(TodoRepository)
    private readonly todoRepository: TodoRepository,
  ) {}

  async execute(query: GetTodosQuery): Promise<BasePageable<TodoDto>> {
    const [todos, total] = await this.todoRepository.findAndCount();

    return {
      items: plainToClass(TodoDto, todos, { excludeExtraneousValues: true }),
      page: 0,
      limit: 10,
      total: total,
    } as BasePageable<TodoDto>;
  }
}
