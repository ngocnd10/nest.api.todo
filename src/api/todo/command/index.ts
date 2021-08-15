import { CreateTodoHandler } from './create-todo';
import { RemoveTodoHandler } from './remove-todo';
import { UpdateTodoHandler } from './update-todo';

export * from './create-todo/create-todo.command';
export * from './remove-todo/remove-todo.command';
export * from './update-todo/update-todo.command';

export const commandHandlers = [CreateTodoHandler, RemoveTodoHandler, UpdateTodoHandler];
