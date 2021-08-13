import { NextFunction } from 'express';
import { NestMiddleware } from '@nestjs/common';
import { CommonHelper } from '@helper';

export class GenerateRequestIdMiddleware implements NestMiddleware {
  use(req: any, res: any, next: NextFunction) {
    req.requestId = CommonHelper.createUuid();
    return next();
  }
}
