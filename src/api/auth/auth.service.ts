import { Injectable } from '@nestjs/common';
import { UserRepository } from '@api/auth/repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AppLog } from '@shared/app-log';
import { AuthCredentialDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private appLog: AppLog,
    @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
  ) {
    appLog.setContextAndFileName(AuthService.name, __filename);
  }

  async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.userRepository.createUser(authCredentialDto);
  }
}
