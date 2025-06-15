import { Channel, ConsumeMessage } from 'amqplib';
import { Controller } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
  Ctx,
  RmqContext,
} from '@nestjs/microservices';
import { Edge } from './edge.entity';

@Controller()
export class EdgeEventsController {
  @MessagePattern('edge.created')
  handleEdgeCreated(@Payload() data: Edge, @Ctx() context: RmqContext) {
    console.log(
      `New channel between ${data.node1_alias} and ${data.node1_alias} with a capacity of  ${data.capacity} has been created.`,
    );
    EdgeEventsController.acknowledgeMessage(context);
  }

  @MessagePattern('edge.updated')
  handleEdgeUpdated(@Payload() data: Edge, @Ctx() context: RmqContext) {
    EdgeEventsController.acknowledgeMessage(context);
  }

  private static acknowledgeMessage(context: RmqContext) {
    const channel = context.getChannelRef() as Channel;
    const message = context.getMessage() as ConsumeMessage;
    channel.ack(message);
  }
}
