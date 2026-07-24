import pool from '../config/mysql.js';

class Database {

    async query(sql, params = []) {

        const [rows] = await pool.execute(sql, params);
        return rows;

    }

    async first(sql, params = []) {

        const rows = await this.query(sql, params);

        return rows.length > 0
            ? rows[0]
            : null;

    }

    async execute(sql, params = []) {

        const [result] = await pool.execute(sql, params);
        return result;

    }

    async existsById(table, id) {

        const row = await this.first(
            `SELECT 1
            FROM ${table}
            WHERE id = ?
            LIMIT 1`,
            [id]
        );

        return !!row;

    }

}

export default new Database();