import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class FarsiPipe implements PipeTransform {
  transform(value: Record<string, any>) {
    const items = ['name', 'lastName'];
    const errors: string[] = [];
    const farsi = /^[\u0600-\u06ff\s]{2,}$/;

    for (const key in value) {
      if (items.includes(key)) {
        const isFarsi = farsi.test(value[key] as string);

        if (!isFarsi) {
          errors.push(`${key} is not farsi`);
        }
      }
    }

    if (errors.length) {
      throw new BadRequestException(errors);
    }
    return value;
  }
}
