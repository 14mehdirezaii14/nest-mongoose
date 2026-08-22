import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UploadFilesDto {
  @ApiProperty({
    type: 'array',
    required: true,
    items: {
      type: 'string',
      format: 'binary',
      title: 'add image',
    },
  })
  files: any[];

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: 'string',
  })
  folder?: string;

  @ApiPropertyOptional({
    type: 'number',
    example: 200,
  })
  @IsOptional()
  height?: number;

  @ApiPropertyOptional({
    type: 'number',
    example: 200,
  })
  @IsOptional()
  width?: number;
}
