export declare class RabbitmqConnectorService {
    private _channel;
    private ready;
    constructor();
    connect(): Promise<void>;
    get channel(): Channel;
    onAfterConnect(fn: () => void): void;
}
