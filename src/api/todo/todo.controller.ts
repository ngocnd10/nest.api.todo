import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  CreateTodoDto,
  GetToDoDto,
  GetTodoPageableDto,
  ListTodoDto,
  TodoDto,
  UpdateTodoDto,
} from './dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreateTodoCommand,
  RemoveTodoCommand,
  UpdateTodoCommand,
} from './commands';
import { GetTodoQuery, ListTodoQuery } from './queries';
import { BasePageable, ParseUUIDPipe } from '../../common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

@ApiTags('todo')
@ApiBearerAuth()
@Controller({
  path: 'todo',
  version: '1',
})
export class TodoController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: CreateTodoDto })
  @ApiOkResponse({ type: GetToDoDto, description: 'Success' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  create(@Body() dto: CreateTodoDto): Promise<TodoDto> {
    return this.commandBus.execute(new CreateTodoCommand(dto));
  }

  @Post('list')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: ListTodoDto })
  @ApiOkResponse({ type: GetTodoPageableDto, description: 'Success' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  findAll(@Body() dto: ListTodoDto): Promise<BasePageable<TodoDto>> {
    return this.queryBus.execute(new ListTodoQuery(dto));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetToDoDto, description: 'Success' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<TodoDto> {
    return this.queryBus.execute(new GetTodoQuery(id));
  }

  @Put(':id')
  // @UseGuards(TodoGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: UpdateTodoDto })
  @ApiOkResponse({ type: GetToDoDto, description: 'Success' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateTodoDto,
  ): Promise<TodoDto> {
    return this.commandBus.execute(new UpdateTodoCommand(id, dto));
  }

  @Delete(':id')
  // @UseGuards(TodoGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: DeleteResult, description: 'Success' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.commandBus.execute(new RemoveTodoCommand(id));
  }
}
