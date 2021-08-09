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
  GetListTodoDto,
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
@ApiForbiddenResponse({ description: 'Forbidden' })
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
  create(@Body() dto: CreateTodoDto): Promise<TodoDto> {
    return this.commandBus.execute(new CreateTodoCommand(dto));
  }

  @Post('list')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: ListTodoDto })
  @ApiOkResponse({ type: GetListTodoDto, description: 'Success' })
  findAll(@Body() dto: ListTodoDto): Promise<BasePageable<TodoDto>> {
    return this.queryBus.execute(new ListTodoQuery(dto));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetToDoDto, description: 'Success' })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<TodoDto> {
    return this.queryBus.execute(new GetTodoQuery(id));
  }

  @Put(':id')
  // @UseGuards(TodoGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: UpdateTodoDto })
  @ApiOkResponse({ type: GetToDoDto, description: 'Success' })
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
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.commandBus.execute(new RemoveTodoCommand(id));
  }
}
