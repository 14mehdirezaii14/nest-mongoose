import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class BlogDto {
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
  @IsNotEmpty()
  @ApiProperty({
    example: 'sport',
  })
  category!: string;

  @IsString()
  @ApiProperty({
    example: '',
  })
  image?: string;
}
