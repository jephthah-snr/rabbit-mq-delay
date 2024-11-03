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
exports.baseRoute = void 0;
const http_status_1 = __importDefault(require("http-status"));
const baseRoute = (fastify) => __awaiter(void 0, void 0, void 0, function* () {
    fastify.route({
        method: "GET",
        url: "/",
        preHandler: [],
        handler: (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
            reply.redirect("/api/v1");
        }),
    });
    fastify.route({
        method: "GET",
        url: "/api/v1",
        preHandler: [],
        handler: (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
            reply.status(http_status_1.default.OK).send({
                status: true,
                message: "Boilerplate service running",
                data: {
                    api: "BOILERPLATE API",
                    version: "1.0.0",
                    author: "Couch Ltd.",
                },
            });
        }),
    });
});
exports.baseRoute = baseRoute;
//# sourceMappingURL=base.route.js.map