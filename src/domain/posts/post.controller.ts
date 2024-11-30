import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BaseController } from 'src/share/base.controller';
import { GetToken } from 'src/share/decorators/get-token.decorator';
import { GetUser } from 'src/share/decorators/get-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../user/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';

@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostController extends BaseController {
  constructor(private readonly postService: PostService) {
    super();
  }

  @Post()
  async create(
    @Body() createPostDto: CreatePostDto,
    @GetUser() user: User,
    @GetToken('accessToken') token: string,
  ) {
    return this.postService.create(createPostDto, { token, user });
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
