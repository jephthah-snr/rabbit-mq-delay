"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPClient = void 0;
const axios_1 = __importDefault(require("axios"));
class HTTPClient {
    static create(config) {
        config.headers = Object.assign({
            "content-type": "application/json",
            Accept: "application/json",
            keepAlive: true,
        }, config.headers);
        return axios_1.default.create(config);
    }
}
exports.HTTPClient = HTTPClient;
//# sourceMappingURL=http.util.js.map