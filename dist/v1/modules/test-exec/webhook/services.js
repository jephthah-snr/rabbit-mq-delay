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
const error_util_1 = __importDefault(require("@shared/utils/error.util"));
const http_status_1 = __importDefault(require("http-status"));
const promises_1 = require("node:timers/promises");
const rabbitmq_constants_1 = require("../../../../rabbitmq/rabbitmq.constants");
const rabbitmq_producer_service_1 = require("../../../../rabbitmq/producer/rabbitmq.producer.service");
const rabbitmq_consumer_service_1 = require("../../../../rabbitmq/consumer/rabbitmq.consumer.service");
let RabbitService = class RabbitService {
    constructor(rabbitProducer, rabbitConsumer) {
        Object.defineProperty(this, "rabbitProducer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: rabbitProducer
        });
        Object.defineProperty(this, "rabbitConsumer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: rabbitConsumer
        });
        this.init();
    }
    init() {
        this.rabbitConsumer.listen({
            queue: rabbitmq_constants_1.Queue.GET_STATUS_QUEUE,
            callback: this.publishDelay.bind(this),
        });
        this.rabbitConsumer.listen({
            queue: rabbitmq_constants_1.Queue.DELAYED_PROCESS_QUEUE,
            callback: this.delayQueue.bind(this),
        });
        this.rabbitConsumer.listen({
            queue: rabbitmq_constants_1.Queue.PAYMENT_NOTIFY,
            callback: this.testResponse.bind(this),
        });
    }
    publishDelay() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.rabbitProducer.produce({
                    queue: rabbitmq_constants_1.Queue.PAYMENT_NOTIFY,
                    data: {
                        is_check: "true",
                        DataView: "true",
                        added_timneout: "true",
                    },
                }, true);
            }
            catch (error) {
                throw error;
            }
        });
    }
    testResponse(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Got data-x");
            console.log(data);
        });
    }
    delayQueue(data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Delay Queue Method");
            if (!options || !options.headers || !options.retryInterval) {
                throw new error_util_1.default(http_status_1.default.BAD_REQUEST, "No options");
            }
            const attempt = options.attempt || 1;
            const delayFrom = +options.headers.delayFrom || Date.now();
            const retryInterval = options.retryInterval || 0;
            const expBackoffFactor = options.expBackoffFactor || 1.2;
            const exponentialRetryInterval = retryInterval * Math.pow(expBackoffFactor, attempt);
            const delayTo = delayFrom + exponentialRetryInterval;
            const timeLeft = delayTo - Date.now();
            if (timeLeft > 0) {
                yield (0, promises_1.setTimeout)(timeLeft);
            }
            const updatedOptions = Object.assign(Object.assign({}, options), { attempt: attempt + 1, retryInterval: exponentialRetryInterval, delay: true });
            console.log("re-queung with updated options from delay queue", {
                queue: options.headers.targetQueue,
                data,
                options: updatedOptions,
            });
            return this.rabbitProducer.produce({
                queue: options.headers.targetQueue,
                data: Object.assign(Object.assign({}, data), { updatedOptions }),
                options: updatedOptions,
            });
        });
    }
};
RabbitService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [rabbitmq_producer_service_1.RabbitMqProducerService,
        rabbitmq_consumer_service_1.RabbitmqConsumerService])
], RabbitService);
exports.default = RabbitService;
//# sourceMappingURL=services.js.map