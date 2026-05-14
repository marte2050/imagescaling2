import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { S3_CLIENT } from './s3.module';

@Injectable()
export class S3Service {
  constructor(@Inject(S3_CLIENT) private readonly s3: S3Client) {}

  async uploadS3(file: Express.Multer.File, key: string, bucketName: string) {
    if (!file) {
      throw new HttpException('No file provided', HttpStatus.BAD_REQUEST);
    }

    try {
      await this.s3.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
        }),
      );
    } catch {
      throw new HttpException('Ocorreu um erro ao fazer o upload da imagem.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
