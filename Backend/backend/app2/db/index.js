const mysql = require('mysql2');
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'cars',
  password: '@mista334',
  port: 3306,
});
module.exports = db;
