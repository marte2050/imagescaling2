import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { uploadDTO } from './dto/uploadDTO';
import { ClientKafka } from '@nestjs/microservices';
import { S3_CLIENT } from '../s3/s3.module';
import { KAFKA_SERVICE } from 'src/kafka/kafka.module';

@Injectable()
export class ImagescalingService {
  private readonly bucketName: string;

  constructor(
    private readonly configService: ConfigService,
    @Inject(S3_CLIENT) private readonly s3: S3Client,
    @Inject(KAFKA_SERVICE) private readonly kafkaClient: ClientKafka,
  ) {
    this.bucketName = this.configService.get<string>('MINIO_BUCKET_NAME') ?? 'imagescaling';
  }

  async uploadImage(file: Express.Multer.File, information: uploadDTO) {
    if (!file) {
      throw new HttpException('No file provided', HttpStatus.BAD_REQUEST);
    }

    const fileName = `${Date.now()}-${file.originalname}`;

    try {
      await this.s3.send(
        new PutObjectCommand({
          Bucket: this.bucketName,
          Key: fileName,
          Body: file.buffer,
          ContentType: file.mimetype,
        }),
      );
    } catch {
      throw new HttpException('Ocorreu um erro ao fazer o upload da imagem.', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const key = `${fileName}`;
    const metadata = {
      url: key,
      ...information,
    };

    this.kafkaClient.emit('image_uploaded', { metadata });
    return { message: 'Image uploaded successfully' };
  }
}
