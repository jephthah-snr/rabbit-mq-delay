"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
const tsyringe_1 = require("tsyringe");
const http_status_1 = __importDefault(require("http-status"));
const database_1 = require("../../database");
const redis_client_1 = require("@shared/redis/redis-client");
let HealthService = class HealthService {
    constructor(redisClient) {
        Object.defineProperty(this, "redisClient", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.redisClient = redisClient.get();
    }
    readinessCheck(req, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const postgresHealth = yield this.checkPostgresHealth();
            const redisHealth = yield this.checkRedisHealth();
            if (postgresHealth.status === "UP" && redisHealth.status === "OK") {
                reply.code(http_status_1.default.OK).send({
                    status: "UP",
                    checks: [postgresHealth, redisHealth],
                });
            }
            else {
                reply.code(http_status_1.default.SERVICE_UNAVAILABLE).send({
                    status: "DOWN",
                    checks: [postgresHealth, redisHealth],
                });
            }
        });
    }
    livelinessCheck(req, reply) {
        reply.code(http_status_1.default.OK).send({
            status: "UP",
        });
    }
    checkPostgresHealth() {
        return __awaiter(this, void 0, void 0, function* () {
            const name = "postgres";
            let status = "UP";
            let reason;
            try {
                const res = yield (0, database_1.getDB)().raw("SELECT 1 + 1 as result");
                if (res.rows[0].result !== 2) {
                    status = "DOWN";
                }
            }
            catch (err) {
                status = "DOWN";
                reason = err.message;
            }
            return {
                name,
                status,
                reason,
            };
        });
    }
    checkRedisHealth() {
        return __awaiter(this, void 0, void 0, function* () {
            const name = "redis";
            let status = "OK";
            try {
                if ((yield this.redisClient.ping()) !== "PONG") {
                    status = "DEGRADED";
                }
            }
            catch (err) {
                status = "DEGRADED";
            }
            return {
                name,
                status,
            };
        });
    }
};
HealthService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [redis_client_1.RedisClient])
], HealthService);
exports.default = HealthService;
//# sourceMappingURL=health.service.js.map