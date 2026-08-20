import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogDto } from '../dtos/blog.dto';
import { Blog } from '../types/blog';
import { InjectModel } from '@nestjs/mongoose';
import { BlogSchemaDocument } from '../schemas/blog.schemas';
import { Model, QueryFilter } from 'mongoose';
import { BlogQueryDto } from '../dtos/blog-query.dto';
import { sortUtils } from 'src/shared/utils/sort-utils';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(BlogSchemaDocument.name)
    private readonly blogModel: Model<BlogSchemaDocument>,
  ) {}

  async findAll(queryParams: BlogQueryDto) {
    const { page = 1, limit = 10, search } = queryParams;
    const skip = (page - 1) * limit;

    const sort = sortUtils(queryParams);

    const filter: QueryFilter<BlogSchemaDocument> = {};

    if (search) {
      filter.$or = [
        { title: { $regex: queryParams.search, $options: 'i' } },
        { content: { $regex: queryParams.search, $options: 'i' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.blogModel.find(filter).skip(skip).limit(limit).sort(sort).exec(),
      this.blogModel.countDocuments().exec(),
    ]);

    return { data, total };
  }

  async findOn(id: string) {
    const blog = await this.blogModel
      .findOne({ _id: id })
      .populate('category')
      .exec();

    if (blog) {
      return blog;
    }
    throw new NotFoundException();
  }

  async create(body: BlogDto) {
    const newBlog = new this.blogModel(body);

    await newBlog.save();

    return newBlog;
  }

  async edit(id: string, body: Blog) {
    const newBlog = this.blogModel
      .findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
      })
      .exec();

    return newBlog;
  }

  async delete(id: string) {
    const blog = await this.blogModel.findByIdAndDelete(id);

    return blog;
  }

  findAllCategory(): string {
    return 'Blog CategoryService';
  }
}
