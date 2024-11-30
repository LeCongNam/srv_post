import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CloudinaryService } from './cloudinary.lib';

@Global()
@Module({
  providers: [CloudinaryService, ConfigService],
  exports: [CloudinaryService, ConfigService],
})
export class LibraryModule {}
