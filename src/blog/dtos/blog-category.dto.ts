import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class BlogCategoryDto {
  _id: number;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'title',
  })
  title!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'content',
  })
  content!: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '',
  })
  image?: string;
}
