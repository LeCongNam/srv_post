import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UserHttpService } from '../user/user.http';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => {
        return {
          timeout: 10000,
          maxRedirects: 5,
        };
      },
    }),
  ],
  controllers: [PostController],
  providers: [PostService, UserHttpService],
})
export class PostModule {}
