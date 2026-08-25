import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { BlogDto } from '../dtos/blog.dto';
import { BlogQueryDto } from '../dtos/blog-query.dto';
import { BlogService } from '../services/blog.service';
import { BlogUpdateDto } from '../dtos/blog-update.dto';

@ApiTags('Blog')
@Controller('blog')
// @ApiHeader({
//   name: 'apikey',
//   description: 'API KEY',
// })
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  findAll(@Query() queryParams: BlogQueryDto) {
    return this.blogService.findAll(queryParams);
  }

  @Get(':id')
  findOn(@Param('id') id: string) {
    return this.blogService.findOn(id);
  }

  @Post()
  create(@Body() body: BlogDto) {
    return this.blogService.create(body);
  }

  @Get('category')
  findAllCategory(): string {
    return this.blogService.findAllCategory();
  }

  @Patch(':id')
  edit(@Param('id') id: string, @Body() body: BlogUpdateDto) {
    return this.blogService.edit(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.blogService.delete(id);
  }
}
