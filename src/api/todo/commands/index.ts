import { CreateTodoHandler } from './create-todo/create-todo.command.handler';
import { RemoveTodoHandler } from './remove-todo/remove-todo.command.handler';
import { UpdateTodoHandler } from './update-todo/update-todo.command.handler';

export * from './create-todo/create-todo.command';
export * from './remove-todo/remove-todo.command';
export * from './update-todo/update-todo.command';

export const commandHandlers = [
  CreateTodoHandler,
  RemoveTodoHandler,
  UpdateTodoHandler,
];
