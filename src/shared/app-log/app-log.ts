import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import * as clc from 'cli-color';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLog extends ConsoleLogger {
  protected fileName?: string;

  constructor(fileName: string, context?: string) {
    if (context) {
      super(context);
    } else {
      super();
    }
    this.fileName = fileName;
  }

  setFileName(fileName: string) {
    this.fileName = fileName;
  }

  setContextAndFileName(context: string, fileName: string) {
    this.context = context;
    this.fileName = fileName;
  }

  log(...data) {
    if (!this.isLevelEnabled('log')) {
      return;
    }
    const obj = this.getMessageToPrint(data, 'log');
    this.printMessage(obj.message, obj.context, 'log');
    AppLog.printJSON(obj);
  }

  error(...data) {
    if (!this.isLevelEnabled('error')) {
      return;
    }
    const obj = this.getMessageToPrint(data, 'error');
    this.printMessage(obj.message, obj.context, 'error');
    AppLog.printJSON(obj);
  }

  customError(...data) {
    if (!this.isLevelEnabled('error')) {
      return;
    }
    const obj = this.getMessageToPrint(data, 'error');
    this.printMessage(obj.message, obj.context, 'error');
  }

  warn(...data) {
    if (!this.isLevelEnabled('warn')) {
      return;
    }
    const { context, message } = this.getMessageToPrint(data, 'warn');
    this.printMessage(message, context, 'warn');
  }

  debug(...data) {
    if (!this.isLevelEnabled('debug')) {
      return;
    }
    const { context, message } = this.getMessageToPrint(data, 'debug');
    this.printMessage(message, context, 'debug');
  }

  verbose(...data) {
    if (!this.isLevelEnabled('verbose')) {
      return;
    }
    const { context, message } = this.getMessageToPrint(data, 'debug');
    this.printMessage(message, context, 'verbose');
  }

  private getMessageToPrint(data: any, logLevel?: string) {
    let error = {};
    let message = '';
    for (const i in data) {
      if (data[i] && data[i] instanceof Error && data[i].stack) {
        console.error(data[i].stack || data[i]);
      }
      if (typeof data[i] === 'string') {
        message += data[i];
      } else {
        error = { ...error, ...data[i] };
      }
    }

    return {
      logLevel,
      context: this.context,
      fileName: this.fileName,
      version: process.env.npm_package_version,
      message,
      ...error,
    };
  }

  private printMessage(message: any, context?: string, logLevel?: string, writeStreamType?: 'stdout' | 'stderr') {
    const color = AppLog.getColorByLogLevel(logLevel);
    const output = color(message) || '';
    const pidMessage = color(`[Nest] ${process.pid}  - `);
    const contextMessage = context ? clc.yellow(`[${context}] `) : '';
    const timestampDiff = '';
    const formattedLogLevel = color(logLevel.toUpperCase().padStart(7, ' '));
    const computedMessage = `${pidMessage}${this.getTimestamp()} ${formattedLogLevel} ${contextMessage}${output}${timestampDiff}\n`;
    process[writeStreamType !== null && writeStreamType !== void 0 ? writeStreamType : 'stdout'].write(computedMessage);
  }

  private static getColorByLogLevel(logLevel: string) {
    switch (logLevel) {
      case 'debug':
        return clc.magentaBright;
      case 'warn':
        return clc.yellow;
      case 'error':
        return clc.red;
      case 'verbose':
        return clc.cyanBright;
      default:
        return clc.green;
    }
  }

  private static printJSON(obj: any) {
    console.log(JSON.stringify(obj));
  }
}
