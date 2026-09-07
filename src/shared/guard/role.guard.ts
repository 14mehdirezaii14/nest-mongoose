import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Role } from 'src/user/schemas/user.schema';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly role: Role[]) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request?.user);
    console.log(this.role, '<><><><><>');

    if (this.role.includes(request?.user?.role as Role)) {
      return true;
    } else {
      return false;
    }
  }
}
