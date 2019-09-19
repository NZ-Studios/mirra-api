require("dotenv").config();
const pg = require('pg');
pg.defaults.ssl = true;

module.exports = {
    development: {
        client: "sqlite3",
        useNullAsDefault: true,
        connection: {
            filename: "./data/vivid.db3"
        },
        migrations: {
            directory: "./migrations"
        },
        seeds: {
            directory: "./seeds"
        },
        pool: {
            afterCreate: (connection, done) => {
                connection.run("PRAGMA foreign_keys = ON", done);
            }
        }
    },
    production: {
        client: "pg",
        connection: process.env.DATABASE_URL,
        useNullAsDefault: true,
        migrations: {
            directory: "./migrations"
        },
        seeds: {
            directory: "./seeds"
        },
        pool: {
            min: 2,
            max: 10
        }
    }
};