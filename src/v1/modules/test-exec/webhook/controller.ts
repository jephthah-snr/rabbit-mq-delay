import { FastifyReply, FastifyRequest } from "fastify";
import RabbitService from "./services";
import { injectable } from "tsyringe";

@injectable()
export default class WebhookController {
  constructor(private readonly rabbitService: RabbitService) {}

  sendWebhook = async (req: FastifyRequest, res: FastifyReply) => {
    try {
      this.rabbitService.publishDelay();
      return res.status(200).send({ sent: true });
    } catch (error: any) {
      console.error("Error sending webhook event:", error);
      res.status(500).send({
        status: false,
        error: error.message || "An error occurred",
      });
    }
  };
}
