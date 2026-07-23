import db from "../database/Database.js";
import RecoleccionAsistencia from "../entities/RecoleccionAsistencia.js";

class RecoleccionAsistenciaRepository {

    async crear(recoleccion) {

        const sql = `
            INSERT INTO recolecciones_asistencia
            (
                id_sesion,
                numero,
                estado_recoleccion,
                fecha_inicio,
                fecha_fin
            )
            VALUES (?, ?, ?, ?, ?)
        `;

        const result = await db.execute(sql, [
            recoleccion.idSesion,
            recoleccion.numero,
            recoleccion.estadoRecoleccion,
            recoleccion.fechaInicio,
            recoleccion.fechaFin
        ]);

        recoleccion.id = result.insertId;

        return recoleccion;

    }

    async actualizar(recoleccion) {

        const sql = `
            UPDATE recolecciones_asistencia
               SET estado_recoleccion = ?,
                   fecha_inicio = ?,
                   fecha_fin = ?,
                   updated_at = NOW()
             WHERE id = ?
        `;

        await db.execute(sql, [
            recoleccion.estadoRecoleccion,
            recoleccion.fechaInicio,
            recoleccion.fechaFin,
            recoleccion.id
        ]);

        return recoleccion;

    }

    async obtenerPorId(id) {

        const row = await db.first(`
            SELECT
                id,
                id_sesion AS idSesion,
                numero,
                estado_recoleccion AS estadoRecoleccion,
                fecha_inicio AS fechaInicio,
                fecha_fin AS fechaFin,
                created_at AS createdAt,
                updated_at AS updatedAt
            FROM recolecciones_asistencia
            WHERE id = ?`, [id]);

        return row ? new RecoleccionAsistencia(row) : null;

    }

    async obtenerAbiertaPorSesion(idSesion) {

        const row = await db.first(`
            SELECT
                id,
                id_sesion AS idSesion,
                numero,
                estado_recoleccion AS estadoRecoleccion,
                fecha_inicio AS fechaInicio,
                fecha_fin AS fechaFin,
                created_at AS createdAt,
                updated_at AS updatedAt
            FROM recolecciones_asistencia
            WHERE id_sesion = ?
              AND estado_recoleccion = 1`,
            [idSesion]);

        return row ? new RecoleccionAsistencia(row) : null;

    }

    async obtenerUltimoNumero(idSesion) {

        const row = await db.first(`
            SELECT MAX(numero) AS numero
            FROM recolecciones_asistencia
            WHERE id_sesion = ?`,
            [idSesion]);

        return Number(row?.numero ?? 0);

    }

    async obtenerUltimaPorSesion(idSesion) {

        const row = await db.first(`
            SELECT
                id,
                id_sesion AS idSesion,
                numero,
                estado_recoleccion AS estadoRecoleccion,
                fecha_inicio AS fechaInicio,
                fecha_fin AS fechaFin,
                created_at AS createdAt,
                updated_at AS updatedAt
            FROM recolecciones_asistencia
            WHERE id_sesion = ?
            ORDER BY numero DESC
            LIMIT 1`,
            [idSesion]);

        return row ? new RecoleccionAsistencia(row) : null;

    }

    async obtenerPorSesion(idSesion) {

        const rows = await db.query(`
            SELECT
                id,
                id_sesion AS idSesion,
                numero,
                estado_recoleccion AS estadoRecoleccion,
                fecha_inicio AS fechaInicio,
                fecha_fin AS fechaFin,
                created_at AS createdAt,
                updated_at AS updatedAt
            FROM recolecciones_asistencia
            WHERE id_sesion = ?
            ORDER BY numero`,
            [idSesion]);

        return rows.map(r => new RecoleccionAsistencia(r));

    }

}

export default new RecoleccionAsistenciaRepository();
