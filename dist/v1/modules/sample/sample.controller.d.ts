import { FastifyReply, FastifyRequest } from "fastify";
export default class SampleController {
    private readonly sampleService;
    run: (req: FastifyRequest<{
        Body: {
            value: string;
        };
    }>, reply: FastifyReply) => Promise<never>;
}
