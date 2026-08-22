import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadFileModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { APP_FILTER } from '@nestjs/core';
import { LogFilter } from './shared/filters/log.filter';
import { logSchema, LogSchema } from './shared/schemas/log.schemas';

@Module({
  imports: [
    BlogModule,
    UploadFileModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nest-app'),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'files'),
      serveRoot: '/files',
    }),
    MongooseModule.forFeature([{ name: LogSchema.name, schema: logSchema }]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: LogFilter,
    },
  ],
})
export class AppModule {}
