"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
var Queue;
(function (Queue) {
    Queue["PAYMENT_NOTIFY"] = "swaply:notify-core";
    Queue["NEW_TRANSACTION_QUEUE"] = "swaply:new-transaction";
    Queue["GET_STATUS_QUEUE"] = "swaply:get-status";
    Queue["UPDATE_STATUS_QUEUE"] = "swaply:update-status";
    Queue["SERVICE_UNREACHABLE_QUEUE"] = "swaply:service-unreachable";
    Queue["NOTIFY_CORE"] = "swaply:notify-core";
    Queue["DELAYED_PROCESS_QUEUE"] = "swaply:delayed-process";
    Queue["SEND_WARING_EMAIL"] = "swaply:send-warning-emal";
})(Queue = exports.Queue || (exports.Queue = {}));
//# sourceMappingURL=rabbitmq.constants.js.map