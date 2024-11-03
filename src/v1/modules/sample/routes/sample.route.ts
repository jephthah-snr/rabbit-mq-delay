import { FastifyPluginAsync } from "fastify";
import { container } from "tsyringe";
import SampleController from "../sample.controller";
import validate from "@shared/middlewares/validator.middleware";
import { sampleValidationRules } from "../validations/sample.validation";

const sampleController = container.resolve(SampleController);

export const sampleRoute: FastifyPluginAsync = async (
  fastify
): Promise<void> => {
  // Execute sample service
  fastify.route({
    method: "POST",
    url: `/execute`,
    preHandler: [validate(sampleValidationRules)],
    handler: sampleController.run,
  });
};
