import db from "../database/Database.js";
import SolicitudPalabra from "../entities/SolicitudPalabra.js";

class SolicitudPalabraRepository {

    async crear(solicitud) {
        const result = await db.execute(`
            INSERT INTO solicitudes_uso_palabra
            (id_sesion, id_legislador, estado)
            VALUES (?, ?, ?)`,
            [
                solicitud.idSesion,
                solicitud.idLegislador,
                solicitud.estado
            ]);

        solicitud.id = result.insertId;
        return solicitud;
    }

    async actualizarEstado(id, estado) {
        await db.execute(`
            UPDATE solicitudes_uso_palabra
               SET estado = ?,
                   updated_at = NOW()
             WHERE id = ?`,
            [estado, id]);
    }

    async obtenerPorId(id) {
        const row = await db.first(`
            SELECT
                id,
                id_sesion AS idSesion,
                id_legislador AS idLegislador,
                estado,
                created_at AS createdAt,
                updated_at AS updatedAt
            FROM solicitudes_uso_palabra
            WHERE id = ?`,
            [id]);

        return row ? new SolicitudPalabra(row) : null;
    }

    async obtenerPendientePorSesionLegislador(idSesion, idLegislador) {
        const row = await db.first(`
            SELECT
                id,
                id_sesion AS idSesion,
                id_legislador AS idLegislador,
                estado,
                created_at AS createdAt,
                updated_at AS updatedAt
            FROM solicitudes_uso_palabra
            WHERE id_sesion = ?
              AND id_legislador = ?
              AND estado = 1`,
            [idSesion, idLegislador]);

        return row ? new SolicitudPalabra(row) : null;
    }

    async obtenerPorSesion(idSesion) {
        const rows = await db.query(`
            SELECT
                id,
                id_sesion AS idSesion,
                id_legislador AS idLegislador,
                estado,
                created_at AS createdAt,
                updated_at AS updatedAt
            FROM solicitudes_uso_palabra
            WHERE id_sesion = ?
            ORDER BY created_at ASC`,
            [idSesion]);

        return rows.map(row => new SolicitudPalabra(row));
    }

    async obtenerPendientes(idSesion) {
        const rows = await db.query(`
            SELECT
                id,
                id_sesion AS idSesion,
                id_legislador AS idLegislador,
                estado,
                created_at AS createdAt,
                updated_at AS updatedAt
            FROM solicitudes_uso_palabra
            WHERE id_sesion = ?
              AND estado = 1
            ORDER BY created_at ASC`,
            [idSesion]);

        return rows.map(row => new SolicitudPalabra(row));
    }

}

export default new SolicitudPalabraRepository();