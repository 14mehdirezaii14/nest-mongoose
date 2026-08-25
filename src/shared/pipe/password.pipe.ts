import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class PasswordPipe implements PipeTransform {
  transform(value: Record<string, any>) {
    const { password } = value;

    if (password) {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

      const isValidPassword = passwordRegex.test(password as string);

      if (!isValidPassword) {
        throw new BadRequestException('not valid password');
      }
    }
    return value;
  }
}
