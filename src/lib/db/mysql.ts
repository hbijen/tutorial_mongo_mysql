import mysql from 'mysql2/promise'

export const mysqlconn = await mysql.createConnection({
    host: 'localhost',
    user: 'demo',
    password: 'Demo@1234',
    database: 'world'
})