import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { AppService } from 'src/app.service';
import { LogType } from '../schemas/log.schemas';

@Catch()
export class LogFilter<T> implements ExceptionFilter {
  constructor(private readonly appService: AppService) {}
  async catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'خطای داخلی سرور رخ داده است';

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
