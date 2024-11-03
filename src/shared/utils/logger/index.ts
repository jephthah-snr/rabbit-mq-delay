import pino from "pino";
import { AppConfig } from "@configurations/app.config";

const logger = pino({
  enabled: true,
  mixin() {
    return {
      service: AppConfig.name,
    };
  },
  serializers: {
    req(req) {
      return {
        method: req.method,
        headers: req.headers,
        ip: req.ip,
        url: req.url,
        path: req.path,
        params: req.params,
        query: req.query,
        body: req.body,
      };
    },
    res(res) {
      return {
        statusCode: res.raw.statusCode,
        headers: res.getHeaders(),
        body: res.raw.payload,
      };
    },
    err(err) {
      return {
        id: err.id,
        type: err.type,
        code: err.code,
        message: err.message,
        stack: err.stack,
      };
    },
  },
  redact: ["req.headers.authorization", "res.body.data.banks"],
});

export default logger;
