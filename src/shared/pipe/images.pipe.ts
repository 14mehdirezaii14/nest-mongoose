import {
  ArgumentMetadata,
  BadRequestException,
  FileTypeValidator,
  Injectable,
  MaxFileSizeValidator,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ImagesPipe implements PipeTransform {
  async transform(
    files: Array<Express.Multer.File>,
    metadata: ArgumentMetadata,
  ) {
    const sizeValidator = new MaxFileSizeValidator({
      maxSize: 20000000,
    });

    const typeValidator = new FileTypeValidator({
      fileType: 'image/png',
    });

    for (const image of files) {
      if (!sizeValidator.isValid(image)) {
        throw new BadRequestException(`${image.originalname} is large image`);
      }

      if (!(await typeValidator.isValid(image))) {
        throw new BadRequestException('type image not valid');
      }
    }
    return files;
  }
}
