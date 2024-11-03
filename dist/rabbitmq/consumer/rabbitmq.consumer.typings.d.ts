import { Queue } from "../rabbitmq.constants";
export type ConsumerOptions = {
    retry?: boolean;
    retryInterval?: number;
    maxAttempts?: number;
    delay?: number | boolean;
    expBackoffFactor?: number;
    attempt?: number;
    headers?: Record<string, string | number | Date>;
    error?: any;
};
export type ConsumerListenerCallback<T> = (data: T, options?: ConsumerOptions) => void | Promise<void>;
export interface ConsumerListenOptions {
    fairDispatch?: boolean;
    prefetch?: number;
}
export type ConsumeArgs<T> = {
    queue: Queue;
    options?: ConsumerListenOptions;
    callback: ConsumerListenerCallback<T>;
};
