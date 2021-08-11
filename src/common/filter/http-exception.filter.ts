import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { QueryFailedError } from 'typeorm';
import { AppLog } from '@shared/app-log';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private appLog: AppLog) {}

  catch(exception: any, host: ArgumentsHost): any {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: any = ctx.getResponse();
    const request: any = ctx.getRequest();

    if (exception.getStatus() === 503) {
      return response.status(exception.getStatus()).json(exception.getResponse());
    }

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let errInfo: any = {
      message: 'Internal server error',
      error: 'Internal server error',
    };

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      errInfo = exception.getResponse();
    } else {
      this.handleMessage(exception);
    }

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

  private handleMessage(exception: HttpException | QueryFailedError | Error): void {
    let message = 'Internal Server Error';

    if (exception instanceof QueryFailedError) {
      message = exception.stack.toString();
    } else if (exception instanceof Error) {
      message = exception.stack.toString();
    }

    this.appLog.customError(message);
  }
}
