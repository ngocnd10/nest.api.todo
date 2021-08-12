import { CreateUserHandler } from './create-user/create-user.command.handler';

export * from './create-user/create-user.command';

export const commandHandlers = [CreateUserHandler];
