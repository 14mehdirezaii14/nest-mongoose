import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UploadFileDto {
  @ApiProperty({ type: 'string', format: 'binary', required: true })
  file: any;
  @ApiPropertyOptional({
    type: 'string',
    description: 'Folder where the image should be stored',
    example: 'blog',
  })
  @IsOptional()
  @IsString()
  folder?: string;
}
