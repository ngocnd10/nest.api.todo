import { GetTodoHandler } from './get-todo/get-todo.query.handler';
import { GetTodosHandler } from './get-todos/get-todos.query.handler';

export * from './get-todo/get-todo.query';
export * from './get-todos/get-todos.query';

export const queryHandlers = [GetTodoHandler, GetTodosHandler];
