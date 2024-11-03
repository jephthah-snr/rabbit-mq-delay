import { FastifyReply, FastifyRequest } from "fastify";
import { ObjectLiteral } from "../types/object-literal.type";
declare const validate: (rules: ObjectLiteral, validationMessages?: ObjectLiteral) => (request: FastifyRequest, reply: FastifyReply, done: any) => FastifyReply<import("http").Server, import("http").IncomingMessage, import("http").ServerResponse, import("fastify/types/route").RouteGenericInterface, unknown> | undefined;
export default validate;
