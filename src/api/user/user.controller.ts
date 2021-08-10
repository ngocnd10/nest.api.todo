import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserDto, GetUserDto, UserDto } from './dto';
import { CreateUserCommand } from './command';
import { JwtAuthGuard } from '@common/guard';

@ApiTags('User')
@ApiBearerAuth()
@ApiForbiddenResponse({ description: 'Forbidden' })
@Controller({
  path: 'user',
  version: '1',
})
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Create User', description: 'Create User' })
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse({ type: GetUserDto, description: 'Success' })
  async create(@Body() dto: CreateUserDto): Promise<UserDto> {
    return await this.commandBus.execute(new CreateUserCommand(dto));
  }
}
