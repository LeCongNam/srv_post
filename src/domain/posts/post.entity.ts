import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { BaseEntity } from 'src/share/base.entity';
import { User } from '../user/user.entity';
import { POST_CONSTANT } from './post.constant';

@Schema({
  timestamps: true,
})
export class Post extends BaseEntity {
  constructor(data: any) {
    super();

    if (data) Object.assign(this, data);
  }

  @Prop({
    default: POST_CONSTANT.TYPE.TEXT,
    type: String,
  })
  type: string;

  @Prop({
    type: String,
    index: 'text',
  })
  content: string;

  @Prop({
    default: [],
    type: Array,
  })
  imagePost: [string];

  @Prop({
    type: Types.ObjectId,
  })
  authorId: string | Types.ObjectId;

  @Prop({
    type: String,
    index: 'text',
  })
  authorName: string;

  author?: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);
PostSchema.index({ contents: 'text', authorName: 'text' });
