import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Inject, Injectable } from '@nestjs/common';
import { S3_CLIENT } from 'src/s3/s3.module';
import { MailService } from './mail.service';
import { imageDTO } from './dto/notificationDTO';

@Injectable()
export class NotificationService {
  constructor(
    @Inject(S3_CLIENT) private readonly s3: S3Client,
    private readonly mailService: MailService,
  ) {}

  async getImage(imageURL: string) {
    const command = new GetObjectCommand({
      Bucket: 'imagescaling',
      Key: imageURL,
    });

    const response = await this.s3.send(command);
    const buffer = await response.Body?.transformToByteArray();
    return buffer;
  }

  async notification(body: imageDTO) {
    const bufferImage = await this.getImage(body.metadata.url);
    await this.mailService.sendEmail({
      subject: 'Image Processed',
      to: 'recipient@example.com',
      html: `<p>Your image has been processed. ${body.metadata.url}</p>`,
      buffer: bufferImage,
    });
    return { message: 'Notification sent successfully' };
  }
}
