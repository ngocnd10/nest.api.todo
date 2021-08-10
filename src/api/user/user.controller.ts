import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './command';
import { ApiBearerAuth, ApiBody, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUserDto } from '@api/user/dto/user.dto';

@ApiTags('User')
@ApiBearerAuth()
@ApiForbiddenResponse({ description: 'Forbidden' })
@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Create User', description: 'Create User' })
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse({ type: GetUserDto, description: 'Success' })
  create(@Body() dto: CreateUserDto): Promise<void> {
    return this.commandBus.execute(new CreateUserCommand(dto));
  }
}
