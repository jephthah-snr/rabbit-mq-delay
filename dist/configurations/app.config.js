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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfig = void 0;
const dotenv = __importStar(require("dotenv"));
const env_config_1 = require("./env.config");
dotenv.config();
exports.AppConfig = {
    name: process.env.APP_NAME,
    env: (0, env_config_1.getEnv)(),
    port: Number(process.env.APP_PORT),
    host: process.env.APP_HOST,
    key: process.env.APP_KEY,
    environment: process.env.APP_ENV,
    redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD,
    },
    trouveCore: {
        publicKey: String(process.env.CHIPDEALS_PUBLIC_KEY),
        baseUrl: String(process.env.SWAPLY_BASE_URL),
    },
    database: process.env.DATABASE_URL,
    rabbitMq: {
        server: {
            address: process.env.RABBITMQ_URL || "amqp://localhost:5672",
        },
    },
    kkiapay: {
        publicKey: process.env.KKIAPAY_PUBLIC_KEY,
    },
    chipdeals: {
        publicKey: String(process.env.CHIPDEALS_PUBLIC_KEY),
        baseUrl: String(process.env.CHIPDEALS_BASE_URL),
    },
    mailer: {
        host: process.env.MAILER_SMTP_HOST,
        user: process.env.MAILER_USERNAME,
        port: process.env.MAILER_PORT,
        password: process.env.MAILER_PASSWORD,
        from: process.env.MAILER_USERNAME,
    },
};
//# sourceMappingURL=app.config.js.map