import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AppLog } from '@shared/app-log';
import { AuthCredentialDto } from './dto';
import { UserService } from '@api/user';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '@common/model';

@Injectable()
export class AuthService {
  constructor(
    private appLog: AppLog,
    private readonly jwtService: JwtService,
    private readonly usersService: UserService,
  ) {
    appLog.setContextAndFileName(AuthService.name, __filename);
  }

  async login(dto: AuthCredentialDto) {
    const { password, username } = dto;
    const user = await this.usersService.findByUsername(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException({
        message: 'Invalid login credentials',
        error: 'Unauthorized',
      });
    }

    const payload: JwtPayload = { username, sub: user.id };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
