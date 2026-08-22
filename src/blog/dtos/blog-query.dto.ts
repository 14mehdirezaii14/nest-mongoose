import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional } from 'class-validator';
import { QueryDto } from '../../shared/dtos/general.query.dto';

export class BlogQueryDto extends QueryDto<
  'title' | 'content' | 'createdAt' | 'updatedAt'
> {
  @ApiPropertyOptional({
    enum: ['title', 'content', 'createdAt', 'updatedAt'],
  })
  @IsOptional()
  @IsIn(['title', 'content', 'createdAt', 'updatedAt'])
  declare sortBy?: 'title' | 'content' | 'createdAt' | 'updatedAt';
}
