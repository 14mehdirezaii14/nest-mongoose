import { Module } from '@nestjs/common';
import { BlogController } from './controller/blog.controller';
import { BlogService } from './services/blog.service';
import { BlogSchemaDocument, blogSchema } from './schemas/blog.schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogCategoryService } from './services/blog-category.service';
import { BlogCategoryController } from './controller/blog-category.controller';
import {
  BlogCategoryDocument,
  blogCategorySchema,
} from './schemas/blog-category.schema';
import { SiteBlogController } from './controller/site-blog.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BlogSchemaDocument.name,
        schema: blogSchema,
      },
      {
        name: BlogCategoryDocument.name,
        schema: blogCategorySchema,
      },
    ]),
  ],
  controllers: [BlogController, BlogCategoryController, SiteBlogController],
  providers: [BlogService, BlogCategoryService],
})
export class BlogModule {}
