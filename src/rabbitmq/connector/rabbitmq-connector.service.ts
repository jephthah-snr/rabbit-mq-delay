import { injectable } from "tsyringe";
import { AppConfig } from "@configurations/app.config";
import { Channel, connect as rmqConnect } from "amqplib";
import logger from "@shared/utils/logger";

@injectable()
export class RabbitmqConnectorService {
  private _channel: Channel;
  private ready = false;

  constructor() {
    this.connect();
  }

  async connect() {
    try {
      logger.info("Connection to RabbitMQ server...");
      const uri = AppConfig.rabbitMq.server.address;
      const connection = await rmqConnect(uri);
      this._channel = await connection.createChannel();
      logger.debug("RabbitMQ server connected!");
      this.ready = true;
    } catch (error: any) {
      logger.error(`RabbitMQ server connection failed:\n ${error.message}`);
    }
  }

  get channel() {
    return this._channel;
  }

  onAfterConnect(fn: () => void) {
    const stateInterval = setInterval(() => {
      if (this.ready) {
        fn();
        clearInterval(stateInterval);
      }
    }, 500);
  }
}
