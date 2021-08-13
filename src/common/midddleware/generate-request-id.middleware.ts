import { NextFunction } from 'express';
import { uuid } from '@helper';
import { NestMiddleware } from '@nestjs/common';

export class GenerateRequestIdMiddleware implements NestMiddleware {
  use(req: any, res: any, next: NextFunction) {
    req.requestId = uuid();
    return next();
  }
}
