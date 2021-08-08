import { Injectable } from '@nestjs/common';
import { AppLog } from '../../shared/app-log';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoRepository } from './repository';
import { Todo } from './entities';

@Injectable()
export class TodoService {
  constructor(
    private appLog: AppLog,
    @InjectRepository(TodoRepository)
    private readonly todoRepository: TodoRepository,
  ) {
    appLog.setContextAndFileName(TodoService.name, __filename);
  }

  async findById(id: string): Promise<Todo> {
    return await this.todoRepository.findOne(id);
  }
}
