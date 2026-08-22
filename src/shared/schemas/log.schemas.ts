import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum LogType {
  Error = 'error',
}

@Schema({ timestamps: true })
export class LogSchema extends Document {
  @Prop()
  type: string;

  @Prop()
  content: string;
}

export const logSchema = SchemaFactory.createForClass(LogSchema);
