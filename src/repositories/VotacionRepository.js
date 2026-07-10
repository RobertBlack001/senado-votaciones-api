import Database from '../database/Database.js';
import Votacion from '../entities/Votacion.js';

const SQL_GET_BY_ID = `
    SELECT
        id,
        id_sesion,
        asunto,
        duracion_segundos,
        estado,
        fecha_inicio,
        fecha_fin,
        fecha_fin_manual,
        observaciones
    FROM votaciones
    WHERE id = ?;
`;

const SQL_GET_OPEN = `
    SELECT
        id,
        id_sesion,
        asunto,
        duracion_segundos,
        estado,
        fecha_inicio,
        fecha_fin,
        fecha_fin_manual,
        observaciones
    FROM votaciones
    WHERE estado = 'A'
    LIMIT 1;
`;

const SQL_UPDATE = `
    UPDATE votaciones
    SET
        id_sesion = ?,
        asunto = ?,
        duracion_segundos = ?,
        estado = ?,
        fecha_inicio = ?,
        fecha_fin = ?,
        fecha_fin_manual = ?,
        observaciones = ?,
        updated_at = NOW()
    WHERE id = ?;
`;

class VotacionRepository {

    async getById(id) {

        const row = await Database.first(
            SQL_GET_BY_ID,
            [id]
        );

        if (!row) {
            return null;
        }

        return new Votacion({

            id: row.id,
            idSesion: row.id_sesion,
            asunto: row.asunto,
            duracionSegundos: row.duracion_segundos,
            estado: row.estado,
            fechaInicio: row.fecha_inicio,
            fechaFin: row.fecha_fin,
            fechaFinManual: row.fecha_fin_manual,
            observaciones: row.observaciones

        });

    }

    async getOpen() {

        const row = await Database.first(SQL_GET_OPEN);

        if (!row) {
            return null;
        }

        return new Votacion({

            id: row.id,
            idSesion: row.id_sesion,
            asunto: row.asunto,
            duracionSegundos: row.duracion_segundos,
            estado: row.estado,
            fechaInicio: row.fecha_inicio,
            fechaFin: row.fecha_fin,
            fechaFinManual: row.fecha_fin_manual,
            observaciones: row.observaciones

        });

    }

    async update(votacion) {

        await Database.execute(
            SQL_UPDATE,
            [
                votacion.idSesion,
                votacion.asunto,
                votacion.duracionSegundos,
                votacion.estado,
                votacion.fechaInicio,
                votacion.fechaFin,
                votacion.fechaFinManual,
                votacion.observaciones,
                votacion.id
            ]
        );

    }

}

export default new VotacionRepository();