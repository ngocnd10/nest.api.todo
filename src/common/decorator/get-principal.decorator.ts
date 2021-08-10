import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// @GetPrincipal()

export const GetPrincipal = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const { user } = request;
  return data ? user?.[data] : user;
});
