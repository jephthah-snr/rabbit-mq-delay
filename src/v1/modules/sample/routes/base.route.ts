import { FastifyPluginAsync } from "fastify";
import httpStatus from "http-status";

export const baseRoute: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.route({
    method: "GET",
    url: "/",
    preHandler: [],
    handler: async (req, reply) => {
      reply.redirect("/api/v1");
    },
  });

  fastify.route({
    method: "GET",
    url: "/api/v1",
    preHandler: [],
    handler: async (req, reply) => {
      reply.status(httpStatus.OK).send({
        status: true,
        message: "Boilerplate service running",
        data: {
          api: "BOILERPLATE API",
          version: "1.0.0",
          author: "Couch Ltd.",
        },
      });
    },
  });
};
