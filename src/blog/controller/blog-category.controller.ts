import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BlogCategoryService } from '../services/blog-category.service';
import { BlogQueryCategoryDto } from '../dtos/blog-query-category.dto';
import { BlogCategoryDto } from '../dtos/blog-category.dto';

@ApiTags('Blog-category')
@Controller('blog-category')
export class BlogCategoryController {
  constructor(private readonly blogService: BlogCategoryService) {}

  @Get()
  findAll(@Query() queryParams: BlogQueryCategoryDto) {
    console.log('controller', queryParams);
    return this.blogService.findAll(queryParams);
  }

  @Get(':id')
  findOn(@Param('id') id: string) {
    return this.blogService.findOn(id);
  }

  @Post()
  create(@Body() body: BlogCategoryDto) {
    return this.blogService.create(body);
  }

  @Get('category')
  findAllCategory(): string {
    return this.blogService.findAllCategory();
  }

  @Put(':id')
  edit(@Param('id') id: string, @Body() body: BlogCategoryDto) {
    return this.blogService.edit(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.blogService.delete(id);
  }
}
