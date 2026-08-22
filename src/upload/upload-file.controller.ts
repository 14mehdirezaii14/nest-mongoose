import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UploadFileService } from './upload.service';
import { UploadFileDto } from 'src/upload/dto/upload-file.dto';
import { UploadFilesDto } from 'src/upload/dto/upload-files.dto';
import { DeleteFileDto } from './dto/delete-file';

@ApiTags('Shared')
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

  @Post('upload-files')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: UploadFilesDto,
  ) {
    return this.uploadFileService.uploadFiles(files, body);
  }

  @Delete('delete')
  deleteFile(@Body() body: DeleteFileDto) {
    const { fileName, folder } = body;
    return this.uploadFileService.deleteFile(fileName, folder);
  }
}
