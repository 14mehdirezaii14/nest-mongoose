import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { UploadFileService } from './upload.service';
import { UploadFileDto } from 'src/shared/utils/dtos/upload-file.dto';

@Controller()
export class UploadFileController {
  constructor(private readonly uploadFileService: UploadFileService) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 20000000,
          }),
          new FileTypeValidator({
            fileType: 'image/png',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() body: UploadFileDto,
  ) {
    return this.uploadFileService.uploadFile(file, body);
  }
}
