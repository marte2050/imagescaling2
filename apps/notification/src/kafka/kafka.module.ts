import { Module } from '@nestjs/common';
import { ClientsModule, KafkaOptions, Transport } from '@nestjs/microservices';

const KAFKA_SERVICE = 'KAFKA_SERVICE';

export const kafkaMicroserviceOptions: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: ['localhost:9092'],
    },
    consumer: {
      groupId: 'image-scaling-consumer',
    },
  },
};

@Module({
  imports: [
    ClientsModule.register([
      {
        name: KAFKA_SERVICE,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'image-scaling-consumer',
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class KafkaModule {}
export { KAFKA_SERVICE };
