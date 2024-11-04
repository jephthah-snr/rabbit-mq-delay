import { RabbitmqConnectorService } from "../connector/rabbitmq-connector.service";
import { ConsumeArgs, ConsumerListenerCallback, ConsumerOptions } from "./rabbitmq.consumer.typings";
import { RabbitMqProducerService } from "../producer/rabbitmq.producer.service";
import { Queue } from "../rabbitmq.constants";
export declare class RabbitmqConsumerService {
    private connector;
    private producer;
    constructor(connector: RabbitmqConnectorService, producer: RabbitMqProducerService);
    consume<T>({ queue, options, callback }: ConsumeArgs<T>): void;
    listen<T>({ queue, options, callback }: ConsumeArgs<T>): void;
    executeCallback<T>(queue: Queue, callback: ConsumerListenerCallback<T>, data: T, options: ConsumerOptions): Promise<void | {
        error: {
            status: string;
            data: {
                failureCode: string;
                failureMessage: string;
            };
        };
    }>;
}
