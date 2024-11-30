import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from 'src/domain/posts/post.entity';
import { PostRepository } from 'src/domain/posts/user.repository';
import { User, UserSchema } from 'src/domain/user/user.entity';
import { UserRepository } from 'src/domain/user/user.repository';

const providers = [UserRepository, PostRepository];

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Post.name, schema: PostSchema },
    ]),
  ],
  providers,
  exports: providers,
})
export class RepositoryModule {}
