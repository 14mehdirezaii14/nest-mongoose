import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UrlPipe implements PipeTransform {
  transform(value: any) {
    if (value?.url) {
      const url = /^[a-zA-Z0-9-]+$/;

      const newUrl = value.url.toLowerCase();

      const isValidUrl = url.test(newUrl);

      if (!isValidUrl) {
        throw new BadRequestException('ادرس صفحه را صحیح وارد نمایید');
      }
      return { ...value, url: newUrl };
    }
    return value;
  }
}
