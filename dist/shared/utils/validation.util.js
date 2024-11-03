"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createValidationError = void 0;
const createValidationError = (validationError) => {
    const errors = [];
    for (const [key, value] of Object.entries(validationError)) {
        errors.push({
            field: key,
            message: value[0],
        });
    }
    return errors;
};
exports.createValidationError = createValidationError;
//# sourceMappingURL=validation.util.js.map