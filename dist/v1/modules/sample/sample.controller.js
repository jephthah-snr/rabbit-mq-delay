"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
const tsyringe_1 = require("tsyringe");
const sample_service_1 = __importDefault(require("@v1/modules/sample/services/sample.service"));
const logger_1 = __importDefault(require("@shared/utils/logger"));
const response_util_1 = require("@shared/utils/response.util");
let SampleController = class SampleController {
    constructor() {
        Object.defineProperty(this, "sampleService", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: tsyringe_1.container.resolve(sample_service_1.default)
        });
        Object.defineProperty(this, "run", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (req, reply) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield this.sampleService.execute(req.body.value);
                    return reply.send((0, response_util_1.SuccessResponse)(response.message, response.data));
                }
                catch (error) {
                    logger_1.default.error({ error });
                    return reply.send((0, response_util_1.ErrorResponse)(error.message));
                }
            })
        });
    }
};
SampleController = __decorate([
    (0, tsyringe_1.injectable)()
], SampleController);
exports.default = SampleController;
//# sourceMappingURL=sample.controller.js.map