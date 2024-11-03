import { FastifyReply, FastifyRequest } from "fastify";
import Validator from "validatorjs";
import { ErrorResponse } from "../utils/response.util";
import { ObjectLiteral } from "../types/object-literal.type";
import { createValidationError } from "../utils/validation.util";

const validate = (rules: ObjectLiteral, validationMessages?: ObjectLiteral) => {
  return (request: FastifyRequest, reply: FastifyReply, done) => {
    const validation = new Validator(request.body, rules, validationMessages);

    const errors = validation.errors.all();

    if (validation.fails()) {
      return reply
        .code(400)
        .send(
          ErrorResponse("Your data is invalid", createValidationError(errors))
        );
    }

    done();
  };
};

export default validate;
