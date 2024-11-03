import { Knex } from "knex";

const tableName = "values";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, async (table) => {
    table.uuid("id").notNullable().primary().defaultTo(knex.raw("uuid_generate_v4()"));
    table.text("value").notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(tableName);
}
