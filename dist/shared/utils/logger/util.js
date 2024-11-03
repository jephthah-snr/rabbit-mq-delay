"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogLevelFromStatusCode = void 0;
function getLogLevelFromStatusCode(statusCode) {
    if (statusCode >= 100 && statusCode < 400)
        return "info";
    if (statusCode >= 400 && statusCode < 500)
        return "warn";
    return "error";
}
exports.getLogLevelFromStatusCode = getLogLevelFromStatusCode;
//# sourceMappingURL=util.js.map