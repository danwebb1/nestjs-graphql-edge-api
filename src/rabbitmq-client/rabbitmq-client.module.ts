import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { MICROSERVICE_CLIENT } from '../common/constants';

@Module({
  providers: [
    {
      provide: MICROSERVICE_CLIENT,
      useFactory: () => {
        const rabbitmqUrl = process.env.RABBITMQ_URL;
        const rabbitmqQueue = process.env.RABBITMQ_QUEUE;
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [rabbitmqUrl],
            queue: rabbitmqQueue,
            queueOptions: {
              durable: false,
            },
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [MICROSERVICE_CLIENT],
})
export class RabbitMQClientModule {}
