import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { AppLog } from '@shared/app-log';
import { UserRepository } from '../../repository';
import { CreateUserCommand } from './create-user.command';
import { UserDto } from '../../dto';
import { plainToClass } from 'class-transformer';

@CommandHandler(CreateUserCommand)
export class CreateTodoHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private appLog: AppLog,
    @InjectRepository(UserRepository)
    private readonly todoRepository: UserRepository,
  ) {
    appLog.setContextAndFileName(CreateTodoHandler.name, __filename);
  }

  async execute(command: CreateUserCommand): Promise<UserDto> {
    const { username } = command.props;
    const entity = await this.todoRepository.createUser({ username });
    return plainToClass(UserDto, entity, { excludeExtraneousValues: true });
  }
}
