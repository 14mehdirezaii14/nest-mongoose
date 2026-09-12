import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BlogCategoryService } from '../services/blog-category.service';
import { BlogQueryCategoryDto } from '../dtos/blog-query-category.dto';
import { BlogCategoryDto } from '../dtos/blog-category.dto';
import { BlogCategoryUpdateDto } from '../dtos/blog-category-update';
import { JwtGuard } from 'src/shared/guard/jwt.guard';
import { RoleGuard } from 'src/shared/guard/role.guard';
import { Role } from 'src/user/schemas/user.schema';
import { UrlPipe } from 'src/shared/pipe/url.pipe';

@ApiTags('Blog-category')
@Controller('blog-category')
@UseGuards(JwtGuard, new RoleGuard([Role.Admin, Role.CopyRighter]))
@ApiBearerAuth()
export class BlogCategoryController {
  constructor(private readonly blogService: BlogCategoryService) {}

  @Get()
  findAll(@Query() queryParams: BlogQueryCategoryDto) {
    return this.blogService.findAll(queryParams);
  }

  @Get(':id')
  findOn(@Param('id') id: string) {
    return this.blogService.findOn(id);
  }

  @Post()
  create(@Body(UrlPipe) body: BlogCategoryDto) {
    return this.blogService.create(body);
  }

  @Get('category')
  findAllCategory(): string {
    return this.blogService.findAllCategory();
  }

  @Patch(':id')
  edit(@Param('id') id: string, @Body(UrlPipe) body: BlogCategoryUpdateDto) {
    return this.blogService.edit(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.blogService.delete(id);
  }
}
