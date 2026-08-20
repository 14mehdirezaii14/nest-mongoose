import { Module } from '@nestjs/common';
import { UploadFileController } from './upload-file.controller';
import { UploadFileService } from './upload.service';

@Module({
  imports: [],
  controllers: [UploadFileController],
  providers: [UploadFileService],
})
export class UploadFileModule {}
