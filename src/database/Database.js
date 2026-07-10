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

}

export default new Database();