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
        host: 'localhost',
        port: 1025,
        secure: false,
        auth: {
          user: 'test',
          pass: 'test',
        },
      },
      defaults: {
        from: 'no-reply@example.com',
      },
    }),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, MailService],
})
export class NotificationModule {}
