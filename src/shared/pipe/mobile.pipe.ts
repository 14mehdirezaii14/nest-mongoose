import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { toEnglishDigits } from '../utils/toEnglishDigits';

@Injectable()
export class MobilePipe implements PipeTransform {
  transform(value: Record<string, any>) {
    const { mobile } = value;
    if (mobile) {
      const englishMobile = toEnglishDigits(mobile as string);

      const regexMobile = /^(\+98|0)?9\d{9}$/;

      const isValidMobile = regexMobile.test(englishMobile);

      if (!isValidMobile) {
        throw new BadRequestException(`${englishMobile} is not valid`);
      }

      return { ...value, mobile: englishMobile };
    }
    return value;
  }
}
