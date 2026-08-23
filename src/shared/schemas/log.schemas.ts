import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum LogType {
  Error = 'error',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  PATCH = 'patch',
}

@Schema({ timestamps: true })
export class LogSchema extends Document {
  @Prop()
  type: string;
  @Prop()
  url: string;
  @Prop()
  content: string;
}

export const logSchema = SchemaFactory.createForClass(LogSchema);
