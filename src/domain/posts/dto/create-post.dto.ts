import { ArrayNotEmpty, IsArray, IsEnum, IsString } from 'class-validator';
import { POST_CONSTANT } from '../post.constant';

export class CreatePostDto {
  @IsString()
  contents: string;

  @IsArray()
  @ArrayNotEmpty()
  imagePost: [string];

  @IsEnum(POST_CONSTANT.TYPE)
  type: string;
}
