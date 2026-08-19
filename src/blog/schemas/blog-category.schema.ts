import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class BlogCategoryDocument extends Document {
  @Prop()
  title: string;
  @Prop()
  content: string;
  @Prop()
  image: string;
  @Prop({ select: false })
  __v: number;
}

export const blogCategorySchema =
  SchemaFactory.createForClass(BlogCategoryDocument);
