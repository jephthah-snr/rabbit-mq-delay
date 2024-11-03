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
const tsyringe_1 = require("tsyringe");
const controller_1 = __importDefault(require("./controller"));
const webhookController = tsyringe_1.container.resolve(controller_1.default);
const webhookRoute = (fastify) => __awaiter(void 0, void 0, void 0, function* () {
    fastify.post("/send", {}, webhookController.sendWebhook);
    fastify.route({
        method: ["GET", "POST"],
        url: "/recieve/success",
        handler: webhookController.receiveSuccessWebhook,
    });
    fastify.route({
        method: ["GET", "POST"],
        url: "/recieve/failed",
        handler: webhookController.receiveFailedWebhook,
    });
    fastify.route({
        method: "POST",
        url: "/create/subscription",
        handler: webhookController.createSubscription,
    });
    fastify.route({
        method: "POST",
        url: "/create/endpoint",
        handler: webhookController.createEndpoint,
    });
});
exports.default = webhookRoute;
//# sourceMappingURL=routes.js.map