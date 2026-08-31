import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BlogDto } from '../dtos/blog.dto';
import { BlogQueryDto } from '../dtos/blog-query.dto';
import { BlogService } from '../services/blog.service';
import { BlogUpdateDto } from '../dtos/blog-update.dto';
import { JwtGuard } from 'src/shared/guard/jwt.guard';
import { User } from 'src/shared/decorators/user.decorator';

@ApiTags('Blog')
@Controller('blog')
// @ApiHeader({
//   name: 'apikey',
//   description: 'API KEY',
// })
@UseGuards(JwtGuard)
@ApiBearerAuth()
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
  create(@Body() body: BlogDto, @User() user: string) {
    console.log({ user });
    return this.blogService.create(body, user);
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
