import { injectable } from "tsyringe";
import AppError from "@shared/utils/error.util";
import httpStatus from "http-status";
import { ConsumerOptions } from "../../../../rabbitmq/consumer/rabbitmq.consumer.typings";
import { setTimeout as wait } from "node:timers/promises";
import { Queue } from "../../../../rabbitmq/rabbitmq.constants";
import { RabbitMqProducerService } from "../../../../rabbitmq/producer/rabbitmq.producer.service";
import { RabbitmqConsumerService } from "../../../../rabbitmq/consumer/rabbitmq.consumer.service";

@injectable()
export default class RabbitService {
  constructor(
    private readonly rabbitProducer: RabbitMqProducerService,
    private readonly rabbitConsumer: RabbitmqConsumerService
  ) {
    this.init();
  }

  init() {
    this.rabbitConsumer.listen<any>({
      queue: Queue.GET_STATUS_QUEUE,
      callback: this.publishDelay.bind(this),
    });

    this.rabbitConsumer.listen<any>({
      queue: Queue.DELAYED_PROCESS_QUEUE,
      callback: this.delayQueue.bind(this),
    });

    this.rabbitConsumer.listen<any>({
      queue: Queue.PAYMENT_NOTIFY,
      callback: this.testResponse.bind(this),
    });
  }

  public async publishDelay() {
    try {
      return this.rabbitProducer.produce(
        {
          queue: Queue.PAYMENT_NOTIFY,
          data: {
            is_check: "true",
            DataView: "true",
            added_timneout: "true",
          },
          options: {
            delay: true,
            retry: true,
            maxAttempts: 5,
            expBackoffFactor: 1.2,
            retryInterval: 2000,
          },
        },
        true
      );
    } catch (error) {
      throw error;
    }
  }

  async testResponse(data: any) {
    console.log("Got data-x");
    console.log(data);
    const { updatedOptions } = data;
    console.log("Data options", data.updatedOptions);

    this.rabbitProducer.produce({
      queue: Queue.PAYMENT_NOTIFY,
      data: {
        is_check: "true",
        DataView: "true",
        added_timneout: "true",
      },
      options: { ...updatedOptions, delay: true },
    });
  }

  public async delayQueue(data: any, options?: ConsumerOptions) {
    console.log("Delay Queue Method");

    console.log(options);

    if (!options || !options.headers || !options.retryInterval) {
      throw new AppError(httpStatus.BAD_REQUEST, "No options");
    }
    const attempt = options.attempt || 1;

    const delayFrom = +options.headers.delayFrom || Date.now(); // Default to now if not set
    const retryInterval = options.retryInterval || 0;
    const expBackoffFactor = options.expBackoffFactor || 1.2; // Default to 1 if not set
    const exponentialRetryInterval =
      retryInterval * Math.pow(expBackoffFactor, attempt);
    const delayTo = delayFrom + exponentialRetryInterval;
    const timeLeft = delayTo - Date.now();

    if (timeLeft > 0) {
      console.log("waiting time left", timeLeft);
      await wait(timeLeft);
    }

    const updatedOptions = {
      ...options,
      attempt: attempt + 1, // Increment attempt count
      retryInterval: exponentialRetryInterval,
    };

    console.log("re-queung with updated options from delay queue", {
      queue: options.headers.targetQueue as Queue,
      data,
      options: updatedOptions,
    });

    return this.rabbitProducer.produce({
      queue: options.headers.targetQueue as Queue,
      data: { ...data, updatedOptions },
      options: updatedOptions,
    });
  }
}
