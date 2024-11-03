// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    },
    propagateCreateError: false,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/v1/database/migrations",
    },
    seeds: {
      directory: "./src/v1/database/seeds",
    },
  },
};
