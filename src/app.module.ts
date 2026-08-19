import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadFileModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    BlogModule,
    UploadFileModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nest-app'),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'files'),
      serveRoot: '/files',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
