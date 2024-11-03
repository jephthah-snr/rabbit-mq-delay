import { FastifyReply, FastifyRequest } from "fastify";
import HealthService from "./health.service";
declare class HealthController {
    private healthService;
    constructor(healthService: HealthService);
    readinessCheck: (req: FastifyRequest, res: FastifyReply) => Promise<void>;
    livelinessCheck: (req: FastifyRequest, res: FastifyReply) => Promise<void>;
}
export default HealthController;
