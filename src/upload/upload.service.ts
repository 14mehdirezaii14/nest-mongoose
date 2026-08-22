import { Body, Injectable, UploadedFile, UploadedFiles } from '@nestjs/common';
import { UploadFileDto } from 'src/upload/dto/upload-file.dto';
import { UploadFilesDto } from 'src/upload/dto/upload-files.dto';
import {
  deleteImage,
  saveImage,
  saveImages,
} from 'src/shared/utils/file-upload-utils/file-utils';

@Injectable()
export class UploadFileService {
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UploadFileDto,
  ) {
    return saveImage(file, body);
  }

  uploadFiles(
    @UploadedFiles() file: Array<Express.Multer.File>,
    @Body() body: UploadFilesDto,
  ) {
    return saveImages(file, body);
  }

  deleteFile(fileName: string, folder?: string) {
    return deleteImage(fileName, folder);
  }
}
