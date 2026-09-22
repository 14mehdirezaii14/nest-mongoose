import { Controller, Get, Param, Query } from '@nestjs/common';
import { BlogCategoryService } from '../services/blog-category.service';
import { BlogQueryCategoryDto } from '../dtos/blog-query-category.dto';
import { ApiTags } from '@nestjs/swagger';
import { BlogService } from '../services/blog.service';
import { BlogQueryDto } from '../dtos/blog-query.dto';

const projection = {
  title: 1,
  url: 1,
  image: 1,
};

@ApiTags('public blog')
@Controller('site/blog')
export class SiteBlogController {
  constructor(
    private readonly blogCategoryService: BlogCategoryService,
    private readonly blogService: BlogService,
  ) {}
  @Get('categories')
  findCategories(@Query() queryParams: BlogQueryCategoryDto) {
    return this.blogCategoryService.findAll(queryParams, projection);
  }

  @Get('category/:url')
  async findCategory(
    @Param('url') url: string,
    @Query() queryParams: BlogQueryDto,
  ) {
    const category = await this.blogCategoryService.findOneWithUrl(
      url,
      projection,
    );

    const blogs = await this.blogService.findAll({
      ...queryParams,
      category: category._id.toString(),
    });

    return { category, blogs };
  }

  @Get(':url')
  async findBlog(@Param('url') url: string) {
    const blog = await this.blogService.findOneWithUrl(url);

    const relatedBlog = await this.blogService.findAll({
      category: blog.category._id.toString(),
      exclude: [blog._id.toString()],
    });

    return { blog, relatedBlog };
  }
}
