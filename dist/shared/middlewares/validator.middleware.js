"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validatorjs_1 = __importDefault(require("validatorjs"));
const response_util_1 = require("../utils/response.util");
const validation_util_1 = require("../utils/validation.util");
const validate = (rules, validationMessages) => {
    return (request, reply, done) => {
        const validation = new validatorjs_1.default(request.body, rules, validationMessages);
        const errors = validation.errors.all();
        if (validation.fails()) {
            return reply
                .code(400)
                .send((0, response_util_1.ErrorResponse)("Your data is invalid", (0, validation_util_1.createValidationError)(errors)));
        }
        done();
    };
};
exports.default = validate;
//# sourceMappingURL=validator.middleware.js.map