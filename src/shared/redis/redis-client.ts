import Redis from "ioredis";
import { singleton } from "tsyringe";
import logger from "@shared/utils/logger";
import { AppConfig } from "@configurations/app.config";

@singleton()
export class RedisClient {
  private client: Redis;

  get() {
    this.client = this.client || this.createClient();

    return this.client;
  }

  async close() {
    await this.get().disconnect();
  }

  private createClient() {
    const retryStrategy = (attempts) => {
      const delay = Math.min(attempts * 1000, 15000);
      return delay;
    };

    const redisClient = new Redis({
      host: AppConfig.redis.host,
      port: AppConfig.redis.port,
      username: AppConfig.redis.username,
      password: AppConfig.redis.password,
      showFriendlyErrorStack: true,
      retryStrategy,
      enableOfflineQueue: false,
      maxRetriesPerRequest: null,
      db: 0,
    });

    redisClient.on("error", (err) => {
      logger.error({ err }, "Redis client connection error");
    });

    redisClient.on("ready", () => {
      logger.info("Redis client is ready");
    });

    redisClient.on("reconnecting", () => {
      logger.info("Redis client is reconnected");
    });

    return redisClient;
  }
}
