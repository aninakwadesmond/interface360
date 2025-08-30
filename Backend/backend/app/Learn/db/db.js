const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createPool({
  host: process.env.HOST || 'localhost',
  user: process.env.USER || 'root',
  password: process.env.PASSWORD || '@mista334',
  database: process.env.DATABASE || 'tolearn',
  port: process.env.PORT || 3306,
});
// This code reads the connection details from environment variables
// const db = mysql.createPool({
//   host: process.env.DB_HOST || 'localhost', // Use env var, fallback to localhost for dev
//   user: process.env.DB_USER || 'root', // Use env var, fallback for dev
//   password: process.env.DB_PASSWORD || '', // Use env var, fallback for dev
//   database: process.env.DB_NAME || 'tolearn', // Use env var, fallback for dev
//   port: process.env.DB_PORT || 3306, // Use env var, fallback for dev
// });
console.log('hello', process.env.HOST);

module.exports = db;
