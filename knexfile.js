module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/hlg_db.db3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    },
    production: {
      client: "pg",
      connection: process.env.DATABASE_URL,
      migrations: {
        directory: "./data/migrations"
      },
      seeds: {
        directory: "./data/seeds/production"
      }
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      }
    }
  }
};
