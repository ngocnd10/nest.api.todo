import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AppLogModule } from '@shared/app-log';

@Module({
  imports: [AppLogModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
