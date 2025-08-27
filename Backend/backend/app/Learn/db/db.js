const mysql = require('mysql2');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '@mista334',
  database: 'tolearn',
  port: 3306,
});

module.exports = db;
