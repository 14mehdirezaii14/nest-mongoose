import { IsEnum, IsNotEmpty } from 'class-validator';
import { LogType } from '../schemas/log.schemas';

export class LogDto {
  @IsNotEmpty()
  content: string | object;

  @IsNotEmpty()
  @IsEnum(LogType)
  type: LogType;
}
