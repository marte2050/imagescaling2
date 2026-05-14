import { Inject, Injectable } from '@nestjs/common';
import { imageDTO } from './dto/imageDTO';
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { S3_CLIENT } from 'src/s3/s3.module';
import sharp from 'sharp';
import { KAFKA_SERVICE } from 'src/kafka/kafka.module';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class ImagescalingService {
  constructor(
    @Inject(S3_CLIENT) private readonly s3: S3Client,
    @Inject(KAFKA_SERVICE) private readonly kafkaService: ClientKafka,
  ) {}
  async imageScaling(body: imageDTO) {
    const command = new GetObjectCommand({
      Bucket: 'imagescaling',
      Key: body.metadata.url,
    });

    const key = `${Date.now()}-scaled.jpeg`;
    const response = await this.s3.send(command);
    const buffer = await response.Body?.transformToByteArray();

    const resizedBuffer = await sharp(buffer)
      .resize(body.metadata.width, body.metadata.height)
      .jpeg({ quality: 80 })
      .toBuffer();

    try {
      await this.s3.send(
        new PutObjectCommand({
          Bucket: 'imagescaling',
          Key: key,
          Body: resizedBuffer,
          ContentType: 'image/jpeg',
        }),
      );
    } catch (error) {
      console.error('Error uploading image:', error);
    }

    const metadata = {
      url: key,
    };

    this.kafkaService.emit('notification', { metadata });

    return {
      message: 'Image scaled and uploaded successfully',
    };
  }
}
