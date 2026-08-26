import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class PasswordPipe implements PipeTransform {
  constructor(private readonly isNew: boolean) {}
  async transform(value: Record<string, any>) {
    const { password } = value;

    if (password) {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

      const isValidPassword = passwordRegex.test(password as string);

      if (!isValidPassword) {
        throw new BadRequestException('not valid password');
      } else {
        if (this?.isNew) {
          const salt: string = await bcrypt.genSalt();
          const hashedPassword: string = await bcrypt.hash(
            password as string,
            salt,
          );

          return { ...value, password: hashedPassword };
        }
        return value;
      }
    }

    return value;
  }
}
