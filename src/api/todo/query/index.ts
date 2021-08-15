import { GetTodoHandler } from './get-todo';
import { ListTodoHandler } from './list-todo';

export * from './get-todo/get-todo.query';
export * from './list-todo/list-todo.query';

export const queryHandlers = [GetTodoHandler, ListTodoHandler];
