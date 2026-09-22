import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ProjectionType, QueryFilter } from 'mongoose';
import { sortUtils } from 'src/shared/utils/sort/sort-utils';
import { BlogCategoryDocument } from '../schemas/blog-category.schema';
import { BlogQueryCategoryDto } from '../dtos/blog-query-category.dto';
import { BlogCategoryDto } from '../dtos/blog-category.dto';
import { deleteImage } from 'src/shared/utils/file-upload-utils/file-utils';
import { BlogCategoryUpdateDto } from '../dtos/blog-category-update';

@Injectable()
export class BlogCategoryService {
  constructor(
    @InjectModel(BlogCategoryDocument.name)
    private readonly blogCategoryModel: Model<BlogCategoryDocument>,
  ) {}

  async findAll(
    queryParams: BlogQueryCategoryDto,
    projection: ProjectionType<BlogCategoryDocument> = {},
  ) {
    const { page = 1, limit = 10, search, url } = queryParams;
    const skip = (page - 1) * limit;

    const sort = sortUtils(queryParams);

    const filter: QueryFilter<BlogCategoryDocument> = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }

    if (url) {
      filter.$or = [{ url: { $regex: url, $options: 'i' } }];
    }

    const [data, total] = await Promise.all([
      this.blogCategoryModel
        .find(filter, projection)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .exec(),
      this.blogCategoryModel.countDocuments(filter).exec(),
    ]);

    return { data, total };
  }

  async findOne(id: string, projection?: ProjectionType<BlogCategoryDocument>) {
    const blog = await this.blogCategoryModel.findById(id, projection).exec();

    if (!blog) {
      throw new NotFoundException('Blog category not found');
    }

    return blog;
  }

  async findOneWithUrl(
    url: string,
    projection: ProjectionType<BlogCategoryDocument> = {},
  ) {
    const blog = await this.blogCategoryModel
      .findOne({ url: url })
      .select(projection)
      .exec();

    if (!blog) {
      throw new NotFoundException('Blog category not found');
    }

    return blog;
  }

  async create(body: BlogCategoryDto) {
    const newBlog = new this.blogCategoryModel(body);

    await newBlog.save();

    return newBlog;
  }

  async edit(id: string, body: BlogCategoryUpdateDto) {
    const blog = await this.blogCategoryModel.findById(id).exec();

    if (!blog) {
      throw new NotFoundException(`آیتمی با آیدی ${id} برای آپدیت یافت نشد`);
    }

    if (body?.image) {
      await deleteImage(blog?.image, 'blog-category');
    }

    const newBlog = this.blogCategoryModel
      .findByIdAndUpdate(id, body, {
        returnDocument: 'after',
      })
      .exec();

    return newBlog;
  }

  async delete(id: string) {
    const blog = await this.blogCategoryModel.findByIdAndDelete(id);

    return blog;
  }

  findAllCategory(): string {
    return 'Blog CategoryService';
  }
}
