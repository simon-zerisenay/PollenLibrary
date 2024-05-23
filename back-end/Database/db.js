const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config()
  

const db = mysql
  .createPool({
    host: process.env.host,
    user: process.env.user,
    port: 3306,
    password: process.env.password,
    ssl: {
      rejectUnauthorized: false,
    },
    database: process.env.database,
  })
  .promise();

  
  db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to database successfully');
        connection.release(); // Release the connection
    }
});

  module.exports = db;