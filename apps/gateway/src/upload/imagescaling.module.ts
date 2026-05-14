import { Module } from '@nestjs/common';
import { ImagescalingService } from './imagescaling.service';
import { ImagescalingController } from './imagescaling.controller';
import { ConfigModule } from '@nestjs/config';
import { S3Module } from '../s3/s3.module';
import { KafkaModule } from 'src/kafka/kafka.module';
import { S3Service } from 'src/s3/s3.service';
import { KafkaService } from 'src/kafka/kafka.service';

@Module({
  imports: [ConfigModule, S3Module, KafkaModule],
  controllers: [ImagescalingController],
  providers: [ImagescalingService, S3Service, KafkaService],
})
export class ImagescalingModule {}
