import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTodoQuery } from './get-todo.query';

@QueryHandler(GetTodoQuery)
export class GetTodoHandler implements IQueryHandler<GetTodoQuery> {
  execute(query: GetTodoQuery): Promise<any> {
    return Promise.resolve(GetTodoHandler.name);
  }
}
