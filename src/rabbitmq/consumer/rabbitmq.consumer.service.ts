import { injectable } from "tsyringe";
import logger from "@shared/utils/logger";
import { ConsumeMessage } from "amqplib";
import { RabbitmqConnectorService } from "../connector/rabbitmq-connector.service";
import {
  ConsumeArgs,
  ConsumerListenerCallback,
  ConsumerOptions,
} from "./rabbitmq.consumer.typings";
import { RabbitMqProducerService } from "../producer/rabbitmq.producer.service";
import { Queue } from "../rabbitmq.constants";

@injectable()
export class RabbitmqConsumerService {
  constructor(
    private connector: RabbitmqConnectorService,
    private producer: RabbitMqProducerService
  ) {}

  consume<T>({ queue, options, callback }: ConsumeArgs<T>) {
    const channel = this.connector.channel;
    channel.assertQueue(queue, { durable: true });

    const fairDispatch = !options || options.fairDispatch;

    if (fairDispatch) {
      channel.prefetch(options?.prefetch ?? 1);
    }

    logger.info(`[${queue}] queue is ready for reading message`);

    channel.consume(
      queue,
      async (msg: ConsumeMessage) => {
        const { data, options: msgOptions } = JSON.parse(
          msg.content.toString()
        );
        await this.executeCallback(
          queue,
          callback,
          data,
          msgOptions as ConsumerOptions
        );
        channel.ack(msg);
        logger.info(`[${queue}] Message consumed:`);
        console.log(data);
      },
      { noAck: false }
    );
  }

  listen<T>({ queue, options, callback }: ConsumeArgs<T>) {
    try {
      console.log(`received from ${queue}, ${callback}`);
      this.connector.onAfterConnect(() => {
        this.consume({ queue, options, callback });
      });
    } catch (error: any) {
      logger.error(
        `Unable to listen messages on queue [${queue}]: ${error.message}`
      );
    }
  }

  async executeCallback<T>(
    queue: Queue,
    callback: ConsumerListenerCallback<T>,
    data: T,
    options: ConsumerOptions
  ) {
    console.log("executing callback");
    if (!options) {
      return await callback(data, options);
    }

    console.log("consumer execute calback options", options);

    if ((options.attempt as number) > Number(options.maxAttempts)) {
      console.log({
        status: "TIMED_OUT",
        data: {
          failureCode: "Process timed out",
          failureMessage:
            "process timed out because its maximum attempt limit was reached",
        },
      });
      return {
        error: {
          status: "TIMED_OUT",
          data: {
            failureCode: "Process timed out",
            failureMessage:
              "process timed out because its maximum attempt limit was reached",
          },
        },
      };
    }

    if (options.delay) {
      delete options.delay;
      return this.producer.produce({
        queue: Queue.DELAYED_PROCESS_QUEUE,
        data,
        options: {
          ...options,
          headers: {
            ...options.headers,
            targetQueue: queue,
            delayFrom: Date.now(),
          },
        },
      });
    }

    try {
      return await callback(data, options);
    } catch (error) {
      logger.error("in error:", error);

      const {
        retryInterval = 5000,
        expBackoffFactor = 1,
        maxAttempts = Infinity,
        headers = undefined,
      } = options;

      const retryCount = !headers ? 1 : +headers.retryCount + 1;

      logger.debug("retryCount:", retryCount, maxAttempts);

      if (retryCount > maxAttempts) {
        return callback(data, {
          error: {
            status: "TIMED_OUT",
            data: {
              failureCode: "Process times out",
              failureMessage:
                "process timed out because its maximum attempt limit was reached",
            },
          },
        });
      }

      const newInterval = !headers
        ? retryInterval
        : expBackoffFactor * retryInterval;
      this.producer.produce({
        queue: Queue.DELAYED_PROCESS_QUEUE,
        data,
        options: {
          retryInterval: newInterval,
          expBackoffFactor,
          maxAttempts,
          delay: options.delay,
          headers: { retryCount, targetQueue: queue, delayFrom: Date.now() },
        },
      });
    }
  }
}
