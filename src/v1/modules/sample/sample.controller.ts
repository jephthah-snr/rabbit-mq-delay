import { container, injectable } from "tsyringe";
import SampleService from "@v1/modules/sample/services/sample.service";
import logger from "@shared/utils/logger";
import { FastifyReply, FastifyRequest } from "fastify";
import { ErrorResponse, SuccessResponse } from "@shared/utils/response.util";

@injectable()
export default class SampleController {
  private readonly sampleService: SampleService =
    container.resolve(SampleService);

  run = async (
    req: FastifyRequest<{ Body: { value: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const response = await this.sampleService.execute(req.body.value);

      return reply.send(SuccessResponse(response.message, response.data));
    } catch (error: any) {
      logger.error({ error });

      return reply.send(ErrorResponse(error.message));
    }
  };
}
