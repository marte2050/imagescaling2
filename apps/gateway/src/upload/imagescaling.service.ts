import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { uploadDTO } from './dto/uploadDTO';
import { S3Service } from 'src/s3/s3.service';
import { KafkaService } from 'src/kafka/kafka.service';

@Injectable()
export class ImagescalingService {
  private readonly bucketName: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly s3Service: S3Service,
    private readonly kafkaService: KafkaService,
  ) {
    this.bucketName = this.configService.get<string>('MINIO_BUCKET_NAME') ?? 'imagescaling';
  }

  async uploadImage(file: Express.Multer.File, information: uploadDTO) {
    const key = `${Date.now()}-${file.originalname}`;
    await this.s3Service.uploadS3(file, key, this.bucketName);
    this.kafkaService.publishToKafka(information, key, 'image_uploaded');
    return { message: 'Image uploaded successfully' };
  }
}
