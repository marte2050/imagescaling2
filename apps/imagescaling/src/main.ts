import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { KafkaOptions } from '@nestjs/microservices';
import { kafkaMicroserviceOptions } from './kafka/kafka.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<KafkaOptions>(AppModule, kafkaMicroserviceOptions);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen();
}

void bootstrap();
