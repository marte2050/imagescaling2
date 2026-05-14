import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NotificationService } from './notification.service';
import { imageDTO } from './dto/notificationDTO';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @MessagePattern('notification')
  notification(@Payload() body: imageDTO) {
    return this.notificationService.notification(body);
  }
}
