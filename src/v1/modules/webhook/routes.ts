import { FastifyPluginAsync } from "fastify";
import { container } from "tsyringe";
import WebhookController from "./controller";

const webhookController = container.resolve(WebhookController);

const webhookRoute: FastifyPluginAsync = async (fastify) => {
  fastify.post("/send", {}, webhookController.sendWebhook);

  fastify.route({
    method: ["GET", "POST"],
    url: "/recieve/success",
    handler: webhookController.receiveSuccessWebhook,
  });

  fastify.route({
    method: ["GET", "POST"],
    url: "/recieve/failed",
    handler: webhookController.receiveFailedWebhook,
  });

  fastify.route({
    method: "POST",
    url: "/create/subscription",
    handler: webhookController.createSubscription,
  });

  fastify.route({
    method: "POST",
    url: "/create/endpoint",
    handler: webhookController.createEndpoint,
  });
};

export default webhookRoute;
