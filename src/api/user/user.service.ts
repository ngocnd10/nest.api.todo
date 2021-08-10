import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppLog } from '@shared/app-log';
import { User } from './entity';
import { UserRepository } from './repository';

@Injectable()
export class UserService {
  constructor(
    private appLog: AppLog,
    @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
  ) {
    appLog.setContextAndFileName(UserService.name, __filename);
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({ username });
  }
}
