import { Inject, Injectable } from '@nestjs/common';
import { KAFKA_SERVICE } from './kafka.module';
import { ClientKafka } from '@nestjs/microservices';
import { notificationDTO } from 'src/imagescaling/dto/imageDTO';

@Injectable()
export class KafkaService {
  constructor(@Inject(KAFKA_SERVICE) private readonly kafkaClient: ClientKafka) {}

  publishToKafka(information: notificationDTO, key: string, topic: string) {
    this.kafkaClient.emit(topic, {
      metadata: {
        url: key,
        ...information,
      },
    });
  }
}
