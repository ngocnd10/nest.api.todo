import { Injectable } from '@nestjs/common';
import { AppLog } from '@shared/app-log';

@Injectable()
export class AuthService {
  constructor(private appLog: AppLog) {
    appLog.setContextAndFileName(AuthService.name, __filename);
  }
}
