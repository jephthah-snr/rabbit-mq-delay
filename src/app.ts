import "reflect-metadata";
import "module-alias/register";
import fastify, { FastifyInstance } from "fastify";
import * as dotenv from "dotenv";
import { Server, IncomingMessage, ServerResponse } from "http";
import { AppConfig } from "@configurations/app.config";
import initializeDatabase from "./v1/database";
import healthRoute from "./v1/modules/health/health.route";
import Validator from "validatorjs";
import { baseRoute } from "@v1/modules/sample/routes/base.route";
import { sampleRoute } from "@v1/modules/sample/routes/sample.route";
import { RouteVersion } from "@configurations/route.config";
import rabbitRoute from "@v1/modules/test-exec/webhook/routes";

dotenv.config({ path: process.cwd() + "/.env" });

class App {
  protected app_port: number = AppConfig.port || 3000;
  public app: FastifyInstance<Server, IncomingMessage, ServerResponse>;

  constructor() {
    this.app = fastify({ logger: true });
    this.app.register(baseRoute);
    this.app.register(healthRoute);
    this.app.register(sampleRoute, { prefix: RouteVersion.sample });
    this.app.register(rabbitRoute, { prefix: RouteVersion.webhook });
    this.bootstrapDependencies();
    this.listen();
  }

  async bootstrapDependencies() {
    initializeDatabase();
    this.registerCustomValidationRules();
  }

  public getInstance() {
    return this.app;
  }

  public async close() {
    await this.app.close();
  }

  public registerCustomValidationRules() {
    // initialize custom validations for validatorjs
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    Validator.register(
      "uuid",
      (value: string) => {
        return uuidRegex.test(value);
      },
      ":attribute is not a valid UUID"
    );
  }

  public listen() {
    this.app.listen(this.app_port, "0.0.0.0");
  }
}
export default App;
