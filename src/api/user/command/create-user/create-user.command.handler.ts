import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { AppLog } from '@shared/app-log';
import { UserDto } from '../../dto';
import { UserRepository } from '../../repository';
import { CreateUserCommand } from './create-user.command';
import { ConflictException } from '@nestjs/common';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private appLog: AppLog,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {
    appLog.setContextAndFileName(CreateUserHandler.name, __filename);
  }

  async execute(command: CreateUserCommand): Promise<UserDto> {
    const { username } = command.props;
    let entity;
    try {
      entity = await this.userRepository.createUser({ username });
    } catch (error) {
      if (error.code === '23505') {
        // duplicate username
        this.appLog.error({
          message: 'Username already exists',
          error: 'Conflict',
        });
        throw new ConflictException({
          message: 'Username already exists',
          error: 'Conflict',
        });
      }
      throw error;
    }
    return plainToClass(UserDto, entity, { excludeExtraneousValues: true });
  }
}
