import { PartialType } from '@nestjs/mapped-types';
import { BlogDto } from './blog.dto';

export class BlogUpdateDto extends PartialType(BlogDto) {}
