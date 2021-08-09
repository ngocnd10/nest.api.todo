import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AppLogModule } from '@shared/app-log';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository';
import { CqrsModule } from '@nestjs/cqrs';
import { commandHandlers } from './command';

@Module({
  imports: [CqrsModule, AppLogModule, TypeOrmModule.forFeature([UserRepository])],
  controllers: [UserController],
  providers: [...commandHandlers, UserService],
})
export class UserModule {}
