import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateTodoDto, UpdateTodoDto } from './dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreateTodoCommand,
  RemoveTodoCommand,
  UpdateTodoCommand,
} from './commands';
import { GetTodoQuery, GetTodosQuery } from './queries';

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
  create(@Body() dto: CreateTodoDto) {
    return this.commandBus.execute(new CreateTodoCommand(dto));
  }

  @Get()
  findAll() {
    return this.queryBus.execute(new GetTodosQuery());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetTodoQuery(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTodoDto) {
    return this.commandBus.execute(new UpdateTodoCommand(id, dto));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandBus.execute(new RemoveTodoCommand(id));
  }
}
