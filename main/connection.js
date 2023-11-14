const mysql = require('mysql2');

//creates connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Jondik@M92',
    database: 'employee_db',
});
//connects to the database
connection.connect((err) => {
    if (err) throw err;
    console.log('connected to the database.');
});

module.exports = connection;