"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDB = void 0;
const knex_1 = __importDefault(require("knex"));
const objection_1 = require("objection");
const knexfile_1 = __importDefault(require("../../../knexfile"));
let knex;
function init() {
    knex = (0, knex_1.default)(knexfile_1.default.development);
    objection_1.Model.knex(knex);
    return knex;
}
exports.default = init;
function getDB() {
    return knex;
}
exports.getDB = getDB;
//# sourceMappingURL=index.js.map