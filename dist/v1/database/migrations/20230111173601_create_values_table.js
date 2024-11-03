"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const tableName = "values";
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.createTable(tableName, (table) => __awaiter(this, void 0, void 0, function* () {
            table.uuid("id").notNullable().primary().defaultTo(knex.raw("uuid_generate_v4()"));
            table.text("value").notNullable();
            table.timestamps(true, true);
        }));
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.dropTableIfExists(tableName);
    });
}
exports.down = down;
//# sourceMappingURL=20230111173601_create_values_table.js.map