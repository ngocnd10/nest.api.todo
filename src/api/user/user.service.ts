import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AppLog } from '@shared/app-log';

@Injectable()
export class UserService {
  constructor(
    private appLog: AppLog,
    @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
  ) {
    appLog.setContextAndFileName(UserService.name, __filename);
  }
}
