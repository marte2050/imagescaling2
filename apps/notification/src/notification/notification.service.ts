import { Injectable } from '@nestjs/common';
import { MailService } from './mail.service';
import { imageDTO } from './dto/notificationDTO';
import { S3Service } from 'src/s3/s3.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationService {
  private readonly bucketName: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
    private readonly s3: S3Service,
  ) {
    this.bucketName = this.configService.get<string>('BUCKET_NAME') ?? 'imagescaling';
  }

  async notification(body: imageDTO) {
    const bufferImage = await this.s3.getObject(this.bucketName, body.metadata.key);
    await this.mailService.sendEmail({
      subject: 'Image Processed',
      to: 'recipient@example.com',
      html: `<p>Your image has been processed.</p>`,
      buffer: bufferImage,
    });
    return { message: 'Notification sent successfully' };
  }
}
