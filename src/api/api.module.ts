import { Module } from '@nestjs/common';
import { TodoModule } from './todo';
import { UserModule } from './user';
import { AuthModule } from './auth';
import { HealthModule } from './health';

@Module({
  imports: [HealthModule, AuthModule, UserModule, TodoModule],
})
export class ApiModule {}
