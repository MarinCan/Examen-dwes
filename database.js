// const dotenv = require('dotenv')
// dotenv.config()
const { createPool } = require('mysql2/promise')

const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'examen_fotos'
})

// const pool = createPool({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DB
// })

module.exports = pool