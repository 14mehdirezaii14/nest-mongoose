import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { UserDto } from 'src/user/dto/user.dto';

@Injectable()
export class PasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response: UserDto) => {
        const newResponse = JSON.parse(
          JSON.stringify(response),
        ) as Partial<UserDto>;

        delete newResponse?.password;

        return newResponse;
      }),
    );
  }
}
