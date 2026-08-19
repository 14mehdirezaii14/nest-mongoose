import { IsNotEmpty, IsString } from 'class-validator';

export class BlogCategoryDto {
  _id: number;
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsString()
  @IsNotEmpty()
  image!: string;
}
