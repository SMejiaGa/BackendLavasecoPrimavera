const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',           // Tu usuario de PostgreSQL
    host: 'localhost',            // Dirección del servidor
    database: 'postgres',     // Nombre de la base de datos
    password: 'toor',                 // Contraseña del usuario (puede dejarse vacío si no la hay)
    port: 5432,                   // Puerto de PostgreSQL (por defecto 5432)
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
