// get the client
const mysql = require("mysql2");

// create the connection to database
const connection =  mysql.createConnection({
  host: "localhost",
  user: "root",
  password:'',
  database: "tructure"
});


module.exports = connection;
