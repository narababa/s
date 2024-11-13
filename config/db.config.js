const mysql = require('mysql');

// MySQL Connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'dutyprisma',
    password: 'Gm@180493_gg',
    database: 'duty_db_prisma',
    port: '3306'
})

connection.connect((err) => {
    if (err) {
        console.log('Error connecting to MySQL database = ', err)
        return;
    }
    console.log('MySQL successfully connected!');
})

module.exports = connection;
