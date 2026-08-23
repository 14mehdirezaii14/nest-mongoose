import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadFileModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { logSchema, LogSchema } from './shared/schemas/log.schemas';
import { ConfigModule } from '@nestjs/config';
import { LogInterceptorTsInterceptor } from './shared/intersecpotors/log.interceptor';

@Module({
  imports: [
    BlogModule,
    UploadFileModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.DB_URL as string),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'files'),
      serveRoot: '/files',
    }),
    MongooseModule.forFeature([{ name: LogSchema.name, schema: logSchema }]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_FILTER,
    //   useClass: LogFilter,
    // },
    {
      provide: APP_INTERCEPTOR,
      useClass: LogInterceptorTsInterceptor,
    },
  ],
})
export class AppModule {}
