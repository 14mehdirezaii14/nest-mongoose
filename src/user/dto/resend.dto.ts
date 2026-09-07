import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ResendDto {
  @ApiProperty({
    example: '09378654876',
    description: 'The phone number in international format',
  })
  @IsNotEmpty()
  mobile: string;
}
