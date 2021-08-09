import { Module } from '@nestjs/common';
import { TodoModule } from './todo';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TodoModule, AuthModule],
})
export class ApiModule {}
