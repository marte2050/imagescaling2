import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { kafkaMicroserviceOptions } from './kafka/kafka.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    kafkaMicroserviceOptions,
  );
  await app.listen();
}

Logger.log('Notification Service is running...');

void bootstrap();
