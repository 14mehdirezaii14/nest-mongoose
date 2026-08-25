import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryFilter } from 'mongoose';
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

  async findAll(queryParams: BlogQueryCategoryDto) {
    const { page = 1, limit = 10, search } = queryParams;
    const skip = (page - 1) * limit;

    const sort = sortUtils(queryParams);

    const filter: QueryFilter<BlogCategoryDocument> = {};

    if (search) {
      filter.$or = [
        { title: { $regex: queryParams.search, $options: 'i' } },
        { content: { $regex: queryParams.search, $options: 'i' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.blogCategoryModel
        .find(filter)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .exec(),
      this.blogCategoryModel.countDocuments().exec(),
    ]);

    return { data, total };
  }

  async findOn(id: string) {
    const blog = await this.blogCategoryModel.findOne({ _id: id }).exec();

    if (blog) {
      return blog;
    }
    throw new NotFoundException();
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
