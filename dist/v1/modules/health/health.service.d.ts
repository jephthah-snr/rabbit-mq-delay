import { FastifyReply, FastifyRequest } from "fastify";
import { RedisClient } from "@shared/redis/redis-client";
declare class HealthService {
    private redisClient;
    constructor(redisClient: RedisClient);
    readinessCheck(req: FastifyRequest, reply: FastifyReply): Promise<void>;
    livelinessCheck(req: FastifyRequest, reply: FastifyReply): void;
    private checkPostgresHealth;
    private checkRedisHealth;
}
export default HealthService;
