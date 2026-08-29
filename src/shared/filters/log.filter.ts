import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AppService } from 'src/app.service';
import { LogType } from '../schemas/log.schemas';

interface MongoDuplicateKeyError extends Error {
  code: number;
  keyValue: Record<string, unknown>;
}

@Catch()
export class LogFilter implements ExceptionFilter {
  constructor(private readonly appService: AppService) {}

  async catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = 'خطای داخلی سرور رخ داده است';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse();
    } else {
      const error = exception as MongoDuplicateKeyError;

      if (error?.name === 'MongoServerError' && error?.code === 11000) {
        status = HttpStatus.CONFLICT;

        const keyValue = error.keyValue;
        const field = Object.keys(keyValue)[0];
        const value = keyValue[field];

        message = `مقدار '${String(value)}' برای فیلد '${field}' قبلاً ثبت شده است.`;
      } else {
        console.error('Unhandled Exception:', exception);
      }
    }

    await this.appService.log({
      content: JSON.stringify(message),
      url: request.url,
      type: LogType.Error,
    });

    response.status(status).json({
      success: false,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      error: message,
    });
  }
}
