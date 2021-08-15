import { EntityRepository, Repository, Brackets } from 'typeorm';
import { Todo } from '../entity';
import { ListTodoQuery } from '../query';
import { CreateTodoDto } from '../dto';

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {
  async createTodo({ body, createdBy, title }): Promise<Todo> {
    const todo = this.create({ title, body, createdBy });
    return await this.save(todo);
  }

  async getAllAndCount({ keyword, limit, orderBy, page = 0, sortBy }): Promise<[Todo[], number]> {
    const queryBuilder = this.createQueryBuilder('todo');

    if (limit) {
      queryBuilder.skip(page * limit).take(limit);
    }

    if (sortBy) {
      queryBuilder.addOrderBy(`todo.${sortBy}`, orderBy === 1 ? 'ASC' : 'DESC', 'NULLS LAST');
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
