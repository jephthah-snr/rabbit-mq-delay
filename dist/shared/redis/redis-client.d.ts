import Redis from "ioredis";
export declare class RedisClient {
    private client;
    get(): Redis;
    close(): Promise<void>;
    private createClient;
}
