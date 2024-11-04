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
exports.RabbitmqConsumerService = void 0;
const tsyringe_1 = require("tsyringe");
const logger_1 = __importDefault(require("@shared/utils/logger"));
const rabbitmq_connector_service_1 = require("../connector/rabbitmq-connector.service");
const rabbitmq_producer_service_1 = require("../producer/rabbitmq.producer.service");
const rabbitmq_constants_1 = require("../rabbitmq.constants");
let RabbitmqConsumerService = class RabbitmqConsumerService {
    constructor(connector, producer) {
        Object.defineProperty(this, "connector", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: connector
        });
        Object.defineProperty(this, "producer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: producer
        });
    }
    consume({ queue, options, callback }) {
        var _a;
        const channel = this.connector.channel;
        channel.assertQueue(queue, { durable: true });
        const fairDispatch = !options || options.fairDispatch;
        if (fairDispatch) {
            channel.prefetch((_a = options === null || options === void 0 ? void 0 : options.prefetch) !== null && _a !== void 0 ? _a : 1);
        }
        logger_1.default.info(`[${queue}] queue is ready for reading message`);
        channel.consume(queue, (msg) => __awaiter(this, void 0, void 0, function* () {
            const { data, options: msgOptions } = JSON.parse(msg.content.toString());
            yield this.executeCallback(queue, callback, data, msgOptions);
            channel.ack(msg);
            logger_1.default.info(`[${queue}] Message consumed:`);
            console.log(data);
        }), { noAck: false });
    }
    listen({ queue, options, callback }) {
        try {
            console.log(`received from ${queue}, ${callback}`);
            this.connector.onAfterConnect(() => {
                this.consume({ queue, options, callback });
            });
        }
        catch (error) {
            logger_1.default.error(`Unable to listen messages on queue [${queue}]: ${error.message}`);
        }
    }
    executeCallback(queue, callback, data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("executing callback");
            if (!options) {
                return yield callback(data, options);
            }
            console.log("consumer execute calback options", options);
            if (options.attempt > Number(options.maxAttempts)) {
                console.log({
                    status: "TIMED_OUT",
                    data: {
                        failureCode: "Process timed out",
                        failureMessage: "process timed out because its maximum attempt limit was reached",
                    },
                });
                return {
                    error: {
                        status: "TIMED_OUT",
                        data: {
                            failureCode: "Process timed out",
                            failureMessage: "process timed out because its maximum attempt limit was reached",
                        },
                    },
                };
            }
            if (options.delay) {
                delete options.delay;
                return this.producer.produce({
                    queue: rabbitmq_constants_1.Queue.DELAYED_PROCESS_QUEUE,
                    data,
                    options: Object.assign(Object.assign({}, options), { headers: Object.assign(Object.assign({}, options.headers), { targetQueue: queue, delayFrom: Date.now() }) }),
                });
            }
            try {
                return yield callback(data, options);
            }
            catch (error) {
                logger_1.default.error("in error:", error);
                const { retryInterval = 5000, expBackoffFactor = 1, maxAttempts = Infinity, headers = undefined, } = options;
                const retryCount = !headers ? 1 : +headers.retryCount + 1;
                logger_1.default.debug("retryCount:", retryCount, maxAttempts);
                if (retryCount > maxAttempts) {
                    return callback(data, {
                        error: {
                            status: "TIMED_OUT",
                            data: {
                                failureCode: "Process times out",
                                failureMessage: "process timed out because its maximum attempt limit was reached",
                            },
                        },
                    });
                }
                const newInterval = !headers
                    ? retryInterval
                    : expBackoffFactor * retryInterval;
                this.producer.produce({
                    queue: rabbitmq_constants_1.Queue.DELAYED_PROCESS_QUEUE,
                    data,
                    options: {
                        retryInterval: newInterval,
                        expBackoffFactor,
                        maxAttempts,
                        delay: options.delay,
                        headers: { retryCount, targetQueue: queue, delayFrom: Date.now() },
                    },
                });
            }
        });
    }
};
RabbitmqConsumerService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [rabbitmq_connector_service_1.RabbitmqConnectorService,
        rabbitmq_producer_service_1.RabbitMqProducerService])
], RabbitmqConsumerService);
exports.RabbitmqConsumerService = RabbitmqConsumerService;
//# sourceMappingURL=rabbitmq.consumer.service.js.map