import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImagescalingModule } from 'src/imagescaling/imagescaling.module';

@Module({
  imports: [ImagescalingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
