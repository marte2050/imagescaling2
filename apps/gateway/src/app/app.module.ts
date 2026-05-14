import { Module } from '@nestjs/common';
import { ImagescalingModule } from 'src/upload/imagescaling.module';

@Module({
  imports: [ImagescalingModule],
})
export class AppModule {}
