import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '@api/user/command';

@Controller('user')
export class UserController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  create(@Body() dto: CreateUserDto): Promise<void> {
    return this.commandBus.execute(new CreateUserCommand(dto));
  }
}
