import { GetTodosQuery } from './get-todos.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetTodosQuery)
export class GetTodosHandler implements IQueryHandler<GetTodosQuery> {
  execute(query: GetTodosQuery): Promise<any> {
    return Promise.resolve(GetTodosHandler.name);
  }
}
