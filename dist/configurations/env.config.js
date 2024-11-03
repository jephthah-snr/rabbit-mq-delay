"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnv = void 0;
process.env.NODE_ENV = process.env.NODE_ENV || "development";
const getEnv = () => process.env.NODE_ENV;
exports.getEnv = getEnv;
//# sourceMappingURL=env.config.js.map