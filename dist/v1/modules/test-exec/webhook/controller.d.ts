import { FastifyReply, FastifyRequest } from "fastify";
import RabbitService from "./services";
export default class WebhookController {
    private readonly rabbitService;
    constructor(rabbitService: RabbitService);
    sendWebhook: (req: FastifyRequest, res: FastifyReply) => Promise<undefined>;
}
