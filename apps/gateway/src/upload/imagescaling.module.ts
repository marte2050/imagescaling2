import { Module } from '@nestjs/common';
import { ImagescalingService } from './imagescaling.service';
import { ImagescalingController } from './imagescaling.controller';
import { ConfigModule } from '@nestjs/config';
import { S3Module } from '../s3/s3.module';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  imports: [ConfigModule, S3Module, KafkaModule],
  controllers: [ImagescalingController],
  providers: [ImagescalingService],
})
export class ImagescalingModule {}
