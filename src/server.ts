import "module-alias/register";
import App from "./app";
import * as dotenv from "dotenv";
import { AppConfig } from "@configurations/app.config";

dotenv.config();

const app = new App();

app.bootstrapDependencies().catch((err) => {
  console.log({ err });
  process.exit(1);
});

process
  .on("uncaughtException", (err) => {
    console.log({ err });
    app.close();
    process.exit(1);
  })
  .on("SIGINT", () => {
    app.close();
    process.exit(0);
  });

app.listen();

console.log(`🚀  Fastify server running on port ${AppConfig.port}`);

export default app;
