import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileSchema } from 'src/upload/schemas/upload-file.schema';
import { UploadFileController } from './upload-file.controller';
import { UploadFileService } from './upload.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: File.name,
        schema: FileSchema,
      },
    ]),
  ],
  controllers: [UploadFileController],
  providers: [UploadFileService],
})
export class UploadFileModule {}
