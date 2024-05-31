const mysql = require('mysql2');

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`
    connectTimeout: 10000  // 10 detik
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database');
        connection.release();
    }
});

module.exports = pool.promise();