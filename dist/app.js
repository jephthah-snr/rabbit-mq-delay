"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
require("reflect-metadata");
require("module-alias/register");
const fastify_1 = __importDefault(require("fastify"));
const dotenv = __importStar(require("dotenv"));
const app_config_1 = require("@configurations/app.config");
const database_1 = __importDefault(require("./v1/database"));
const health_route_1 = __importDefault(require("./v1/modules/health/health.route"));
const validatorjs_1 = __importDefault(require("validatorjs"));
const base_route_1 = require("@v1/modules/sample/routes/base.route");
const sample_route_1 = require("@v1/modules/sample/routes/sample.route");
const route_config_1 = require("@configurations/route.config");
const routes_1 = __importDefault(require("@v1/modules/test-exec/webhook/routes"));
dotenv.config({ path: process.cwd() + "/.env" });
class App {
    constructor() {
        Object.defineProperty(this, "app_port", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: app_config_1.AppConfig.port || 3000
        });
        Object.defineProperty(this, "app", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.app = (0, fastify_1.default)({ logger: true });
        this.app.register(base_route_1.baseRoute);
        this.app.register(health_route_1.default);
        this.app.register(sample_route_1.sampleRoute, { prefix: route_config_1.RouteVersion.sample });
        this.app.register(routes_1.default, { prefix: route_config_1.RouteVersion.webhook });
        this.bootstrapDependencies();
        this.listen();
    }
    bootstrapDependencies() {
        return __awaiter(this, void 0, void 0, function* () {
            (0, database_1.default)();
            this.registerCustomValidationRules();
        });
    }
    getInstance() {
        return this.app;
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.app.close();
        });
    }
    registerCustomValidationRules() {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        validatorjs_1.default.register("uuid", (value) => {
            return uuidRegex.test(value);
        }, ":attribute is not a valid UUID");
    }
    listen() {
        this.app.listen(this.app_port, "0.0.0.0");
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map