import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SeoDto {
  @ApiProperty({
    example: '/example',
  })
  @IsNotEmpty()
  @IsString()
  url: string;
  @ApiProperty({
    example: 'example',
  })
  @IsNotEmpty()
  @IsString()
  seoTitle: string;

  @ApiProperty({
    example: 'example',
  })
  @IsNotEmpty()
  @IsString()
  seoDescription: string;

  @ApiProperty({
    example: 'example',
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({
    example: 'example',
  })
  @IsOptional()
  @IsString()
  h1?: string;
}
