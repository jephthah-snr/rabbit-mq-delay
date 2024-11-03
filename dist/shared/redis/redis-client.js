"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.RedisClient = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const tsyringe_1 = require("tsyringe");
const logger_1 = __importDefault(require("@shared/utils/logger"));
const app_config_1 = require("@configurations/app.config");
let RedisClient = class RedisClient {
    constructor() {
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    get() {
        this.client = this.client || this.createClient();
        return this.client;
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.get().disconnect();
        });
    }
    createClient() {
        const retryStrategy = (attempts) => {
            const delay = Math.min(attempts * 1000, 15000);
            return delay;
        };
        const redisClient = new ioredis_1.default({
            host: app_config_1.AppConfig.redis.host,
            port: app_config_1.AppConfig.redis.port,
            username: app_config_1.AppConfig.redis.username,
            password: app_config_1.AppConfig.redis.password,
            showFriendlyErrorStack: true,
            retryStrategy,
            enableOfflineQueue: false,
            maxRetriesPerRequest: null,
            db: 0,
        });
        redisClient.on("error", (err) => {
            logger_1.default.error({ err }, "Redis client connection error");
        });
        redisClient.on("ready", () => {
            logger_1.default.info("Redis client is ready");
        });
        redisClient.on("reconnecting", () => {
            logger_1.default.info("Redis client is reconnected");
        });
        return redisClient;
    }
};
RedisClient = __decorate([
    (0, tsyringe_1.singleton)()
], RedisClient);
exports.RedisClient = RedisClient;
//# sourceMappingURL=redis-client.js.map