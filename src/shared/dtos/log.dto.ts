import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { LogType } from '../schemas/log.schemas';

export class LogDto {
  @IsNotEmpty()
  content: string | object;
  @IsNotEmpty()
  @IsString()
  url: string;
  @IsNotEmpty()
  @IsEnum(LogType)
  type: LogType;
}
