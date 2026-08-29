import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    example: '09378654876',
    description: 'The phone number in international format',
  })
  @IsNotEmpty()
  mobile: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '',
  })
  password: string;
}
