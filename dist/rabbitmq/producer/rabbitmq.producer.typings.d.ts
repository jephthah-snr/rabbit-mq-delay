import { ConsumerOptions } from "../consumer/rabbitmq.consumer.typings";
import { Queue } from "../rabbitmq.constants";
export type ProduceArgs<T> = {
    queue: Queue;
    data: T;
    options?: ConsumerOptions;
};
