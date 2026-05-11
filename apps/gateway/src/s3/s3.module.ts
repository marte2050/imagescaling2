import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';

export const S3_CLIENT = 'S3_CLIENT';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: S3_CLIENT,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return new S3Client({
          region: configService.get<string>('MINIO_REGION') ?? 'us-east-1',
          endpoint: configService.get<string>('MINIO_ENDPOINT') ?? 'http://localhost:9000',
          credentials: {
            accessKeyId: configService.get<string>('MINIO_ACCESS_KEY_ID') ?? 'minioadmin',
            secretAccessKey: configService.get<string>('MINIO_SECRET_ACCESS_KEY') ?? 'minioadmin',
          },
          forcePathStyle: true,
          maxAttempts: 5,
          retryMode: 'adaptive',
        });
      },
    },
  ],
  exports: [S3_CLIENT],
})
export class S3Module {}
