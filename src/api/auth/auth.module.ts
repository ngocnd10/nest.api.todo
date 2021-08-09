import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AppLogModule } from '@shared/app-log';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@api/auth/repository';

@Module({
  imports: [AppLogModule, TypeOrmModule.forFeature([UserRepository])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
