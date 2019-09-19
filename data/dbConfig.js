const knex = require('knex');

const env = process.env.DB_ENV || 'production';

const knexConfig = require('../knexfile')[env];

module.exports = knex(knexConfig);