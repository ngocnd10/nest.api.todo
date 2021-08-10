import { Module } from '@nestjs/common';
import { TodoModule } from './todo';
import { UserModule } from './user';
import { AuthModule } from './auth';

@Module({
  imports: [AuthModule, UserModule, TodoModule],
})
export class ApiModule {}
