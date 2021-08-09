import { GetTodoHandler } from './get-todo/get-todo.query.handler';
import { ListTodoHandler } from './list-todo/list-todo.query.handler';

export * from './get-todo/get-todo.query';
export * from './list-todo/list-todo.query';

export const queryHandlers = [GetTodoHandler, ListTodoHandler];
