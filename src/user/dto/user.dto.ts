import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '',
  })
  lastName: string;

  @ApiProperty({
    example: '09378654876',
    description: 'The phone number in international format',
  })
  @IsNotEmpty()
  mobile: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '',
  })
  password: string;
}
