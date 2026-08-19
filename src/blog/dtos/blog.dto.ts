import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class BlogDto {
  _id!: number;

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
  @IsNotEmpty()
  @ApiProperty({
    example: '',
  })
  image!: string;
}
