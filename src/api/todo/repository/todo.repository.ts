import { EntityRepository, Repository, Brackets } from 'typeorm';
import { Todo } from '../entities';
import { ListTodoQuery } from '../queries';

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {
  async getAllAndCount(query: ListTodoQuery): Promise<[Todo[], number]> {
    const { keyword, limit, orderBy, page = 0, sortBy } = query.props;

    const queryBuilder = this.createQueryBuilder('todo');

    if (limit) {
      queryBuilder.skip(page * limit).take(limit);
    }

    if (sortBy) {
      queryBuilder.addOrderBy(`todo.${sortBy}`, orderBy === 'desc' ? 'DESC' : 'ASC', 'NULLS LAST');
    }

    if (keyword) {
      queryBuilder.andWhere(
        new Brackets(qb => {
          qb.where(`todo.title ILike :keyword or todo.body ILike :keyword`, {
            keyword: `%${keyword}%`,
          });
        }),
      );
    }

    return await queryBuilder.getManyAndCount();
  }
}
