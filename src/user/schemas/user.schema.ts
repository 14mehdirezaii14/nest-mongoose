import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Role {
  User = 'user',
  Admin = 'admin',
  CopyRighter = 'copyRighter',
}

@Schema({ timestamps: true })
export class UserSchemaDocument extends Document {
  @Prop()
  name: string;
  @Prop()
  lastName: string;
  @Prop({
    unique: true,
    type: String,
  })
  mobile: string;
  @Prop()
  password: string;

  @Prop()
  code: string;

  @Prop()
  role: Role;
}

export const userSchema = SchemaFactory.createForClass(UserSchemaDocument);
