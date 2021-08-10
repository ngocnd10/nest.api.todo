import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// @GetUser()

export const GetUser = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const { user } = request;
  return data ? user?.[data] : user;
});
