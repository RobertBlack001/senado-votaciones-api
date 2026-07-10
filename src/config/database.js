import pool from './mysql.js';

export async function testConnection() {

    const connection = await pool.getConnection();

    try {
        await connection.query('SELECT 1');
        console.log('✅ MySQL conectado.');
    } finally {
        connection.release();
    }

}