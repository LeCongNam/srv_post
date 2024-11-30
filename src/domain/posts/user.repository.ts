import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepositoryAbstract } from 'src/share/base.repository';
import { Post } from './post.entity';

@Injectable()
export class PostRepository extends BaseRepositoryAbstract<Post> {
  constructor(
    @InjectModel(Post.name)
    private readonly _postModel: Model<Post>,
  ) {
    super(_postModel);
  }
}
