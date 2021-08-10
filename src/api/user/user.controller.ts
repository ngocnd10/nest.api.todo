import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserDto, GetUserDto } from './dto';
import { CreateUserCommand } from './command';

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
