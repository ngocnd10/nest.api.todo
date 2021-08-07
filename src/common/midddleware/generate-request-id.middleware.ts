import { NextFunction } from 'express';
import { v4 } from 'uuid';
import { NestMiddleware } from '@nestjs/common';

export class GenerateRequestIdMiddleware implements NestMiddleware {
  use(req: any, res: any, next: NextFunction) {
    req.requestId = v4();
    return next();
  }
}
