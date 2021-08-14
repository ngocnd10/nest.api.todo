import { CreateUserHandler } from './create-user';

export * from './create-user/create-user.command';

export const commandHandlers = [CreateUserHandler];
