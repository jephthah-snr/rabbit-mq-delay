import { ConsumerOptions } from "../../../../rabbitmq/consumer/rabbitmq.consumer.typings";
import { RabbitMqProducerService } from "../../../../rabbitmq/producer/rabbitmq.producer.service";
import { RabbitmqConsumerService } from "../../../../rabbitmq/consumer/rabbitmq.consumer.service";
export default class RabbitService {
    private readonly rabbitProducer;
    private readonly rabbitConsumer;
    constructor(rabbitProducer: RabbitMqProducerService, rabbitConsumer: RabbitmqConsumerService);
    init(): void;
    publishDelay(): Promise<void>;
    testResponse(data: any): Promise<void>;
    delayQueue(data: any, options?: ConsumerOptions): Promise<void>;
}
