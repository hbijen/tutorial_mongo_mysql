import mysql from 'mysql2/promise'

let connection : mysql.Connection;

export async function getMySQlConnection(): Promise<mysql.Connection> {
    if (!connection) {
        connection = await mysql.createConnection({
            host: 'localhost',
            user: 'demo',
            password: 'Demo@1234',
            database: 'world',
            decimalNumbers: true
        }).then()
    }
    return connection
    
}
