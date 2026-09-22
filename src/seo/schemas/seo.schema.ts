import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Seo extends Document {
  @Prop({
    require: true,
    unique: true,
    type: String,
  })
  url: string;

  @Prop()
  seoTitle: string;

  @Prop()
  seoDescription: string;

  @Prop({
    default: null,
    required: false,
  })
  h1: string;

  @Prop({ default: null, required: false })
  content: string;
}

export const seoSchema = SchemaFactory.createForClass(Seo);
