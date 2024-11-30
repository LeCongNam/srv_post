import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { UserHttpService } from '../user/user.http';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './post.entity';
import { PostRepository } from './user.repository';

@Injectable()
export class PostService {
  constructor(
    private readonly _postRepo: PostRepository,
    private readonly _userSrv: UserHttpService,
  ) {}

  async create(
    createPostDto: CreatePostDto,
    payload: { user: User; token: string },
  ): Promise<Post> {
    const post = await this._postRepo.create({
      ...createPostDto,
      authorId: payload.user._id,
    });

    post.author = await this._userSrv.getOne(payload.user._id, payload.token);

    return post;
  }

  findAll() {
    return this._postRepo.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
