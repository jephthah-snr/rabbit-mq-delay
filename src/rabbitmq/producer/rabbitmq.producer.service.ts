import { injectable } from "tsyringe";
import { RabbitmqConnectorService } from "../connector/rabbitmq-connector.service";
import { ProduceArgs } from "./rabbitmq.producer.typings";
// import { debugObject } from "src/common/utils.common";
import logger from "@shared/utils/logger";

@injectable()
export class RabbitMqProducerService {
  constructor(private readonly connector: RabbitmqConnectorService) {}

  async produce<T>(
    { queue, data, options }: ProduceArgs<T>,
    initial?: boolean
  ) {
    try {
      if (initial) {
        console.log("is initial producer not from delay");
        if (options) {
          console.log("initial producer options data from initial", options);
        }
      } else {
        console.log("is not initial producer, is from delay");
        console.log("producer options data", options);
        console.log("queue", queue);
      }
      const channel = this.connector.channel;
      channel.assertQueue(queue, { durable: true });
      channel.sendToQueue(
        queue,
        Buffer.from(JSON.stringify({ data, options })),
        {
          persistent: true,
        }
      );
      logger.info(`New message sent to [${queue}] queue, options: ${data}`);
    } catch (error: any) {
      logger.error(
        `Unable to send message to [${queue}] queue: ${error.message}`
      );
    }
  }
}
