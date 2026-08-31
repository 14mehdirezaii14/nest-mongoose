import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BlogCategoryDocument } from './blog-category.schema';
import { UserDto } from 'src/user/dto/user.dto';

@Schema({ timestamps: true })
export class BlogSchemaDocument extends Document {
  @Prop()
  title: string;
  @Prop()
  content: string;
  @Prop()
  image: string;
  @Prop({ select: false })
  __v: number;

  @Prop({
    type: Types.ObjectId,
    ref: BlogCategoryDocument.name,
    required: true,
  })
  category: BlogCategoryDocument;
  @Prop({
    type: Types.ObjectId,
    name: UserDto.name,
    required: false,
  })
  user?: UserDto;
}

export const blogSchema = SchemaFactory.createForClass(BlogSchemaDocument);
