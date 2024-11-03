"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sample = void 0;
const objection_1 = require("objection");
class Sample extends objection_1.Model {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "value", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
}
exports.Sample = Sample;
Object.defineProperty(Sample, "tableName", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: "payment_reference_information"
});
//# sourceMappingURL=sample.model.js.map