import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { AppLog } from '../../shared';
import { QueryFailedError } from 'typeorm';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private appLog: AppLog) {}

  catch(exception: any, host: ArgumentsHost): any {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: any = ctx.getResponse();
    const request: any = ctx.getRequest();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let errInfo: any = {
      message: 'Internal server error',
      error: 'Internal server error',
    };

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      errInfo = exception.getResponse();
    }

    this.handleMessage(exception, errInfo);

    const responseBody = {
      apiUrl: request.url,
      statusCode,
      environment: process.env.NODE_ENVIRONMENT || 'local',
      isSuccess: false,
      requestId: request.requestId,
      permissionCode: request.permissionCode,
      message: errInfo ? errInfo.message : 'Error',
      service: process.env.npm_package_name,
      version: process.env.npm_package_version,
      error: errInfo,
    };

    response.status(statusCode).json(responseBody);
  }

  private handleMessage(
    exception: HttpException | QueryFailedError | Error,
    errInfo: any,
  ): void {
    let message = 'Internal Server Error';

    if (exception instanceof HttpException) {
      message = errInfo.message;
    } else if (exception instanceof QueryFailedError) {
      message = exception.stack.toString();
    } else if (exception instanceof Error) {
      message = exception.stack.toString();
    }

    this.appLog.customError(message);
  }
}
