import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { TodoService } from './todo.service';
import { ERROR } from '@common/constant';

@Injectable()
export class TodoGuard implements CanActivate {
  constructor(private readonly todoService: TodoService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const userId = request.user.sub;
    if (!userId) {
      throw new ForbiddenException(ERROR.FORBIDDEN_RESOURCE);
    }

    const id = request.body.id || request.params.id;
    const todo = await this.todoService.findById(id);

    if (!(todo?.createdBy === userId)) {
      throw new ForbiddenException(ERROR.FORBIDDEN_RESOURCE);
    }

    return true;
  }
}
