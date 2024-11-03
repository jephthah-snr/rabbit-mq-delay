"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleRoute = void 0;
const tsyringe_1 = require("tsyringe");
const sample_controller_1 = __importDefault(require("../sample.controller"));
const validator_middleware_1 = __importDefault(require("@shared/middlewares/validator.middleware"));
const sample_validation_1 = require("../validations/sample.validation");
const sampleController = tsyringe_1.container.resolve(sample_controller_1.default);
const sampleRoute = (fastify) => __awaiter(void 0, void 0, void 0, function* () {
    fastify.route({
        method: "POST",
        url: `/execute`,
        preHandler: [(0, validator_middleware_1.default)(sample_validation_1.sampleValidationRules)],
        handler: sampleController.run,
    });
});
exports.sampleRoute = sampleRoute;
//# sourceMappingURL=sample.route.js.map