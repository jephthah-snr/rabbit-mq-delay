import { FastifyReply, FastifyRequest } from "fastify";
export default class WebhookController {
    constructor();
    sendWebhook: (req: FastifyRequest, res: FastifyReply) => Promise<undefined>;
    receiveSuccessWebhook: (req: FastifyRequest, res: FastifyReply) => Promise<never>;
    receiveFailedWebhook: (req: FastifyRequest, res: FastifyReply) => Promise<never>;
    createSubscription: (req: FastifyRequest<{
        Body: {
            endpoint_id: string;
        };
    }>, res: FastifyReply) => Promise<undefined>;
    createEndpoint: (req: FastifyRequest<{
        Body: {
            endpoint_id: string;
        };
    }>, res: FastifyReply) => Promise<undefined>;
}
