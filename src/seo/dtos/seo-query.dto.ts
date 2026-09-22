import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { QueryDto } from 'src/shared/dtos/general.query.dto';

export class SeoQueryDto extends QueryDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  url?: string;
}
