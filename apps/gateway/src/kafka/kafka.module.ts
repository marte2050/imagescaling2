import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

const KAFKA_SERVICE = 'KAFKA_SERVICE';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: KAFKA_SERVICE,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: process.env.KAFKA_BROKERS?.split(',') || ['localhost:9092'],
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class KafkaModule {}
export { KAFKA_SERVICE };
