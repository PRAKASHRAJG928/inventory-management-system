const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '090503',
  database: 'inventory_db',
});

connection.connect((err) => {
  if (err) {
    console.log('Database connection failed:', err);
  } else {
    console.log('MySQL Connected');
  }
});

module.exports = connection;

