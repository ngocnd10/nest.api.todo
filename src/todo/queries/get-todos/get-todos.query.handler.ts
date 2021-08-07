import { GetTodosQuery } from './get-todos.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TodoRepository } from '../../repository/todo.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from '../../entities/todo.entity';

@QueryHandler(GetTodosQuery)
export class GetTodosHandler implements IQueryHandler<GetTodosQuery> {
  constructor(
    @InjectRepository(TodoRepository)
    private readonly todoRepository: TodoRepository,
  ) {}

  async execute(query: GetTodosQuery): Promise<Todo[]> {
    const todos = await this.todoRepository.find();
    return todos;
  }
}
