"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const _1 = __importDefault(require("."));
const util_1 = require("./util");
function logRequest(req, reply) {
    const logLevel = (0, util_1.getLogLevelFromStatusCode)(reply.raw.statusCode);
    _1.default[logLevel]({
        req,
        res: reply,
    });
}
exports.default = (0, fastify_plugin_1.default)((fastify, options, done) => {
    fastify.addHook("preSerialization", (req, reply, payload, done) => {
        Object.assign(reply.raw, { payload });
        done();
    });
    fastify.addHook("onResponse", logRequest);
    done();
});
//# sourceMappingURL=plugin.js.map