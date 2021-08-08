import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TodoService } from './todo.service';

@Injectable()
export class TodoGuard implements CanActivate {
  constructor(private readonly todoService: TodoService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const userId = request.user.id;
    if (!userId) {
      return false;
    }

    const id = request.body.id || request.params.id;
    const todo = await this.todoService.findById(id);
    return todo?.createdBy === userId;
  }
}