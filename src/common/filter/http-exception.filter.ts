import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: any = ctx.getResponse();
    const request: any = ctx.getRequest();

    let errInfo: any = {
      message: 'Internal server error',
      code: 'INTERNAL_SERVER_ERROR',
    };
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      errInfo = exception.getResponse();
      statusCode = exception.getStatus();
    }

    const responseBody = {
      apiUrl: request.url,
      statusCode,
      environment: process.env.NODE_ENVIRONMENT || 'local',
      isSuccess: true,
      requestId: request.requestId,
      permissionCode: request.permissionCode,
      message: errInfo.length ? errInfo[0].message : 'Error',
      service: process.env.npm_package_name,
      version: process.env.npm_package_version,
      errors: [errInfo],
    };

    response.status(statusCode).json(responseBody);
  }
}
