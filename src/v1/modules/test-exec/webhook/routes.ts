import { FastifyPluginAsync } from "fastify";
import { container } from "tsyringe";
import WebhookController from "./controller";

const webhookController = container.resolve(WebhookController);

const rabbitRoute: FastifyPluginAsync = async (fastify) => {
  fastify.post("/send", {}, webhookController.sendWebhook);

  fastify.route({
    method: ["POST"],
    url: "/test-rabbit",
    handler: webhookController.sendWebhook,
  });
};

export default rabbitRoute;
