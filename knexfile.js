require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "HireLambdaStudents",
      user: "brandon",
      password: "apollo"
    },
    pool: {
      min: 2,
      max: 10
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      tableName: "knex_migrations",
      directory: "./data/seeds"
    }
  },
  testing: {
    client: "pg",
    connection: {
      database: "HireLambdaStudents",
      user: "brandon",
      password: "apollo"
    },
    pool: {
      min: 2,
      max: 10
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      tableName: "knex_migrations",
      directory: "./data/seeds"
    }
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds/"
    }
  }
};
