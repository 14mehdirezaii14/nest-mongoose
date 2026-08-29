import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
}

export const userSchema = SchemaFactory.createForClass(UserSchemaDocument);
