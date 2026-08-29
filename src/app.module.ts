import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadFileModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { logSchema, LogSchema } from './shared/schemas/log.schemas';
import { ConfigModule } from '@nestjs/config';
import { LogInterceptorTsInterceptor } from './shared/interceptors/log.interceptor';
import { TimeMiddleware } from './shared/middleware/time.middleware';
import { UserModule } from './user/user.module';
import { LogFilter } from './shared/filters/log.filter';
import { JwtModule } from '@nestjs/jwt';

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
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      global: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: LogFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LogInterceptorTsInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TimeMiddleware).forRoutes('*');
  }
}
