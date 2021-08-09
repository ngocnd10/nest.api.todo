import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { AppLog } from '@shared/app-log';
import { UserRepository } from '../../repository';
import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateTodoHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private appLog: AppLog,
    @InjectRepository(UserRepository)
    private readonly todoRepository: UserRepository,
  ) {
    appLog.setContextAndFileName(CreateTodoHandler.name, __filename);
  }

  async execute(command: CreateUserCommand): Promise<void> {
    const { username } = command.props;
    return await this.todoRepository.createUser({ username });
  }
}
