import { Controller, Get, Post, Body, Param, Delete, Put, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiBody, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { BasePageable, JwtPayload } from '@common/model';
import { ParseUUIDPipe } from '@common/pipe';
import { GetUser } from '@common/decorator';
import { JwtAuthGuard } from '@api/auth';
import { CreateTodoDto, GetToDoDto, GetListTodoDto, ListTodoDto, TodoDto, UpdateTodoDto } from './dto';
import { CreateTodoCommand, RemoveTodoCommand, UpdateTodoCommand } from './command';
import { GetTodoQuery, ListTodoQuery } from './query';
import { TodoGuard } from './todo.guard';

@ApiTags('Todo')
@ApiBearerAuth()
@ApiForbiddenResponse({ description: 'Forbidden' })
@Controller({
  path: 'todo',
  version: '1',
})
@UseGuards(JwtAuthGuard)
export class TodoController {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Create Todo', description: 'Create Todo' })
  @ApiBody({ type: CreateTodoDto })
  @ApiOkResponse({ type: GetToDoDto, description: 'Success' })
  create(@Body() dto: CreateTodoDto, @GetUser() user: JwtPayload): Promise<TodoDto> {
    return this.commandBus.execute(new CreateTodoCommand({ ...dto, createdBy: user.sub }));
  }

  @Post('list')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Search Todo List', description: 'Search Todo List' })
  @ApiBody({ type: ListTodoDto })
  @ApiOkResponse({ type: GetListTodoDto, description: 'Success' })
  findAll(@Body() dto: ListTodoDto): Promise<BasePageable<TodoDto>> {
    return this.queryBus.execute(new ListTodoQuery(dto));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Todo By Id', description: 'Get Todo By Id' })
  @ApiOkResponse({ type: GetToDoDto, description: 'Success' })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<TodoDto> {
    return this.queryBus.execute(new GetTodoQuery(id));
  }

  @Put(':id')
  @UseGuards(TodoGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update Todo', description: 'Update Todo' })
  @ApiBody({ type: UpdateTodoDto })
  @ApiOkResponse({ type: GetToDoDto, description: 'Success' })
  update(@Param('id') id: string, @Body() dto: UpdateTodoDto, @GetUser() user: any): Promise<TodoDto> {
    return this.commandBus.execute(new UpdateTodoCommand(id, { ...dto, updatedBy: user.sub }));
  }

  @Delete(':id')
  @UseGuards(TodoGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete Todo', description: 'Delete Todo' })
  @ApiOkResponse({ type: DeleteResult, description: 'Success' })
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.commandBus.execute(new RemoveTodoCommand(id));
  }
}
