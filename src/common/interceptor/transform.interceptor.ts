import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseResponse } from '../model/base-response';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, BaseResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<BaseResponse<T>> {
    const ctx: HttpArgumentsHost = context.switchToHttp();
    const request: any = ctx.getRequest();

    return next.handle().pipe(
      map(
        (data) =>
          ({
            apiUrl: request.url,
            data,
            statusCode: 200,
            environment: process.env.NODE_ENVIRONMENT || 'local',
            isSuccess: true,
            requestId: request.requestId,
            permissionCode: request.permissionCode,
            message: 'Success',
            service: process.env.name,
            version: process.env.npm_package_version,
          } as BaseResponse<T>),
      ),
    );
  }
}
