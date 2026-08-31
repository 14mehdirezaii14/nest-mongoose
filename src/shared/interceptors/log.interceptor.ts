import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, tap } from 'rxjs';

import { AppService } from 'src/app.service';
import { LogType } from '../schemas/log.schemas';

@Injectable()
export class LogInterceptorTsInterceptor implements NestInterceptor {
  constructor(private appService: AppService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();

    return next.handle().pipe(
      tap((response) => {
        if (request.method !== 'GET') {
          this.appService
            .log({
              type: LogType[request.method] as LogType,
              url: request.url,
              content: JSON.stringify(response),
              user: request['user'] || null,
            })
            .catch((err) => {
              console.error('Error saving log:', err);
            });
        }
      }),
    );
  }
}
