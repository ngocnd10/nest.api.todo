import { Module } from '@nestjs/common';
import { TodoModule } from './todo';
import { UserModule } from '@api/user';
import { AuthModule } from '@api/auth';

@Module({
  imports: [TodoModule, UserModule, AuthModule],
})
export class ApiModule {}
