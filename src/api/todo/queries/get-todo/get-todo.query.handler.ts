import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTodoQuery } from './get-todo.query';
import { TodoDto } from '../../dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoRepository } from '../../repository/todo.repository';
import { plainToClass } from 'class-transformer';

@QueryHandler(GetTodoQuery)
export class GetTodoHandler implements IQueryHandler<GetTodoQuery> {
  constructor(
    @InjectRepository(TodoRepository)
    private readonly todoRepository: TodoRepository,
  ) {}

  async execute(query: GetTodoQuery): Promise<TodoDto> {
    const todo = await this.todoRepository.findOne(query.id);
    return plainToClass(TodoDto, todo, { excludeExtraneousValues: true });
  }
}
