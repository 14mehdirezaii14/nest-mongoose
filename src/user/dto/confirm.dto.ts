import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmDto {
  @ApiProperty({
    example: '09378654876',
    description: 'code',
  })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({
    example: '09378654876',
    description: 'The phone number in international format',
  })
  @IsNotEmpty()
  mobile: string;
}
