import { RabbitmqConnectorService } from "../connector/rabbitmq-connector.service";
import { ProduceArgs } from "./rabbitmq.producer.typings";
export declare class RabbitMqProducerService {
    private readonly connector;
    constructor(connector: RabbitmqConnectorService);
    produce<T>({ queue, data, options }: ProduceArgs<T>, initial?: boolean): Promise<void>;
}
