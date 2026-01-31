const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,   // sekarang 3309 sesuai MySQL kamu
    dialect: process.env.DB_DIALECT,
    logging: false,
  }
);

module.exports = sequelize;
