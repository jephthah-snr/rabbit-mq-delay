"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponse = exports.SuccessResponse = void 0;
const SuccessResponse = (message, data) => {
    return {
        status: true,
        message,
        data,
    };
};
exports.SuccessResponse = SuccessResponse;
const ErrorResponse = (message, errors) => {
    return {
        success: false,
        message,
        errors,
    };
};
exports.ErrorResponse = ErrorResponse;
//# sourceMappingURL=response.util.js.map