import { NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { validate as uuidValidate } from 'uuid';

export function ConvertUrlToPermissionCode(req: any) {
  const url = req.baseUrl + req.path;
  let { method } = req;
  const appName = process.env.npm_package_name;

  const actions = url.split('/').filter(Boolean) as string[];
  const actionLast = actions[actions.length - 1];
  if (
    ['GET', 'get'].includes(method) &&
    actionLast &&
    !uuidValidate(actionLast) &&
    !isFinite(actionLast as any)
  ) {
    method = 'list';
  }
  let permissionCode = `${appName}.${method}`;
  actions.map((item) => {
    if (item && !uuidValidate(item) && !isFinite(item as any)) {
      permissionCode += `.${item}`;
    }
  });
  return permissionCode.toLowerCase();
}

export class GeneratePermissionCodeMiddleware implements NestMiddleware {
  use(req: any, res: any, next: NextFunction) {
    req.permissionCode = ConvertUrlToPermissionCode(req);
    return next();
  }
}
