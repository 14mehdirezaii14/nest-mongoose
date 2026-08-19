import { Body, Injectable, UploadedFile } from '@nestjs/common';
import { UploadFileDto } from 'src/shared/utils/dtos/upload-file.dto';
import { saveImage } from 'src/shared/utils/file-upload-utils/file-utils';

@Injectable()
export class UploadFileService {
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UploadFileDto,
  ) {
    return saveImage(file, body);
  }
}
