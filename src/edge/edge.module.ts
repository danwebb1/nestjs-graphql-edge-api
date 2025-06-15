import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Edge } from './edge.entity';
import { EdgeService } from './edge.service';
import { EdgeResolver } from './edge.resolver';
import { ConfigModule } from '@nestjs/config';
import { EdgeEventsController } from './edge.events.controller';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Edge]),
    ClientsModule.register([
      {
        name: 'EDGE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672'],
          queue: process.env.RABBITMQ_QUEUE || 'edge_events',
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
  providers: [EdgeResolver, EdgeService, EdgeEventsController],
})
export class EdgeModule {}
