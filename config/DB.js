const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    database: process.env.DB_NAME || 'nombre_base_datos',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    port: process.env.DB_PORT
});

module.exports = db;
