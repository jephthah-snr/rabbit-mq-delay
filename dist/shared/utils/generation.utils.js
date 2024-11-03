"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateReference = void 0;
const generateReference = () => {
    var result = "";
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var i = 16; i > 0; --i)
        result += chars[Math.floor(Math.random() * chars.length)];
    return result;
};
exports.generateReference = generateReference;
//# sourceMappingURL=generation.utils.js.map