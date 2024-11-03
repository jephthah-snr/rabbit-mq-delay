/// <reference types="node" />
import "reflect-metadata";
import "module-alias/register";
import { FastifyInstance } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
declare class App {
    protected app_port: number;
    app: FastifyInstance<Server, IncomingMessage, ServerResponse>;
    constructor();
    bootstrapDependencies(): Promise<void>;
    getInstance(): FastifyInstance<Server, IncomingMessage, ServerResponse, import("fastify").FastifyLoggerInstance>;
    close(): Promise<void>;
    registerCustomValidationRules(): void;
    listen(): void;
}
export default App;
