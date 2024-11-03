import * as dotenv from "dotenv";
import { getEnv } from "./env.config";

dotenv.config();

export const AppConfig = {
  name: process.env.APP_NAME as string,
  env: getEnv(),
  port: Number(process.env.APP_PORT),
  host: process.env.APP_HOST as string,
  key: process.env.APP_KEY as string,
  environment: process.env.APP_ENV as string,
  redis: {
    host: process.env.REDIS_HOST as string,
    port: Number(process.env.REDIS_PORT),
    username: process.env.REDIS_USERNAME as string,
    password: process.env.REDIS_PASSWORD as string,
  },
  trouveCore: {
    publicKey: String(process.env.CHIPDEALS_PUBLIC_KEY),
    baseUrl: String(process.env.SWAPLY_BASE_URL),
  },
  database: process.env.DATABASE_URL as string,
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
    host: process.env.MAILER_SMTP_HOST as string,
    user: process.env.MAILER_USERNAME as string,
    port: process.env.MAILER_PORT as string,
    password: process.env.MAILER_PASSWORD as string,
    from: process.env.MAILER_USERNAME,
  },
};
