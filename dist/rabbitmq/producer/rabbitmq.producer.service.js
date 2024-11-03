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
exports.RabbitMqProducerService = void 0;
const tsyringe_1 = require("tsyringe");
const rabbitmq_connector_service_1 = require("../connector/rabbitmq-connector.service");
const logger_1 = __importDefault(require("@shared/utils/logger"));
let RabbitMqProducerService = class RabbitMqProducerService {
    constructor(connector) {
        Object.defineProperty(this, "connector", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: connector
        });
    }
    produce({ queue, data, options }, initial) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (initial) {
                    console.log("is initial producer not from delay");
                    if (options) {
                        console.log("initial producer options data from initial", options);
                    }
                }
                else {
                    console.log("is not initial producer, is from delay");
                    console.log("producer options data", options);
                    console.log("queue", queue);
                }
                const channel = this.connector.channel;
                channel.assertQueue(queue, { durable: true });
                channel.sendToQueue(queue, Buffer.from(JSON.stringify({ data, options })), {
                    persistent: true,
                });
                logger_1.default.info(`New message sent to [${queue}] queue, options: ${data}`);
            }
            catch (error) {
                logger_1.default.error(`Unable to send message to [${queue}] queue: ${error.message}`);
            }
        });
    }
};
RabbitMqProducerService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [rabbitmq_connector_service_1.RabbitmqConnectorService])
], RabbitMqProducerService);
exports.RabbitMqProducerService = RabbitMqProducerService;
//# sourceMappingURL=rabbitmq.producer.service.js.map