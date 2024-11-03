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
const convoy_js_1 = require("convoy.js");
const generation_utils_1 = require("@shared/utils/generation.utils");
const http_status_1 = __importDefault(require("http-status"));
const response_util_1 = require("@shared/utils/response.util");
const convoy = new convoy_js_1.Convoy({
    api_key: "CO.NflD0wgMnCFO89fF.l0zgD48966PewuJ83JeIBNwr59wwkdC4qimBbVmoVd5FtxQwzqw6VM9p0PwgLmbo",
    uri: "http://localhost:5005/api/v1",
    project_id: "01J3Z36MTFG8X9WKHMM93S0VY6",
});
class WebhookController {
    constructor() {
        Object.defineProperty(this, "sendWebhook", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (req, res) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const eventData = {
                        idempotency_key: (0, generation_utils_1.generateReference)(),
                        owner_id: "jeph1234",
                        event_type: "payment.failed",
                        data: {
                            status: "Completed",
                            description: "Transaction Successful",
                            userID: "test_user_id808",
                        },
                    };
                    const response = yield convoy.events.createFanOutEvent(eventData);
                    return res
                        .status(http_status_1.default.OK)
                        .send((0, response_util_1.SuccessResponse)("event created successfully", response));
                }
                catch (error) {
                    console.error("Error sending webhook event:", error);
                    res.status(500).send({
                        status: false,
                        error: error.message || "An error occurred",
                    });
                }
            })
        });
        Object.defineProperty(this, "receiveSuccessWebhook", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (req, res) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const body = req.body;
                    console.log("Received webhook data:", body);
                    return res.status(200).send({
                        status: true,
                        message: "Success webhook received successfully",
                    });
                }
                catch (error) {
                    console.error("Error processing webhook:", error);
                    return res.status(500).send({
                        status: false,
                        message: "Failed to process webhook",
                    });
                }
            })
        });
        Object.defineProperty(this, "receiveFailedWebhook", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (req, res) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const body = req.body;
                    console.log("Received webhook data:", body);
                    return res.status(200).send({
                        status: true,
                        message: "Failed webhook received successfully",
                    });
                }
                catch (error) {
                    console.error("Error processing webhook:", error);
                    return res.status(500).send({
                        status: false,
                        message: "Failed to process webhook",
                    });
                }
            })
        });
        Object.defineProperty(this, "createSubscription", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (req, res) => __awaiter(this, void 0, void 0, function* () {
                try {
                    try {
                        const subscriptionData = {
                            name: "event-sub",
                            endpoint_id: req.body.endpoint_id,
                            type: subscriptionEnum.API,
                        };
                        const response = yield convoy.subscriptions.create(subscriptionData);
                        return res
                            .status(http_status_1.default.OK)
                            .send((0, response_util_1.SuccessResponse)("Subscription created successfully", response.data));
                    }
                    catch (error) {
                        console.log(error);
                    }
                }
                catch (error) {
                    throw error;
                }
            })
        });
        Object.defineProperty(this, "createEndpoint", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (req, res) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const endpointData = {
                        owner_id: "jeph1234",
                        advanced_signatures: false,
                        name: "test-endpoint-success-true",
                        support_email: "jsnr300@gmail.com",
                        url: "https://a094-154-66-135-97.ngrok-free.app/api/v1/webhook/recieve/failed",
                        description: "failed endpoint for",
                        secret: "endpoint-secret",
                        events: ["payment.failed"],
                    };
                    const response = yield convoy.endpoints.create(endpointData);
                    return res
                        .status(http_status_1.default.OK)
                        .send((0, response_util_1.SuccessResponse)("Endpoint created successfully", response));
                }
                catch (error) {
                    console.log(error);
                }
            })
        });
    }
}
exports.default = WebhookController;
//# sourceMappingURL=controller.js.map