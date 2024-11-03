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
exports.RabbitmqConnectorService = void 0;
const tsyringe_1 = require("tsyringe");
const app_config_1 = require("@configurations/app.config");
const amqplib_1 = require("amqplib");
const logger_1 = __importDefault(require("@shared/utils/logger"));
let RabbitmqConnectorService = class RabbitmqConnectorService {
    constructor() {
        Object.defineProperty(this, "_channel", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "ready", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        this.connect();
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("Connection to RabbitMQ server...");
                const uri = app_config_1.AppConfig.rabbitMq.server.address;
                const connection = yield (0, amqplib_1.connect)(uri);
                this._channel = yield connection.createChannel();
                logger_1.default.debug("RabbitMQ server connected!");
                this.ready = true;
            }
            catch (error) {
                logger_1.default.error(`RabbitMQ server connection failed:\n ${error.message}`);
            }
        });
    }
    get channel() {
        return this._channel;
    }
    onAfterConnect(fn) {
        const stateInterval = setInterval(() => {
            if (this.ready) {
                fn();
                clearInterval(stateInterval);
            }
        }, 500);
    }
};
RabbitmqConnectorService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], RabbitmqConnectorService);
exports.RabbitmqConnectorService = RabbitmqConnectorService;
//# sourceMappingURL=rabbitmq-connector.service.js.map