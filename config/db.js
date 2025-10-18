require('dotenv').config()

//creamos un objeto para poder trabajar con la BD
const mysql = require('mysql2/promise')

//Creamos el pool de conexiones
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
})
//Exportamos el pool para aprovecharlo en otras partes
module.exports = pool