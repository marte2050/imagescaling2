import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { S3Module } from 'src/s3/s3.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';

@Module({
  imports: [
    S3Module,
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST || 'localhost',
        port: process.env.MAIL_PORT ? parseInt(process.env.MAIL_PORT) : 1025,
        secure: false,
        auth: {
          user: process.env.MAIL_USER || 'test',
          pass: process.env.MAIL_PASS || 'test',
        },
      },
      defaults: {
        from: process.env.MAIL_FROM || 'no-reply@example.com',
      },
    }),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, MailService],
})
export class NotificationModule {}
