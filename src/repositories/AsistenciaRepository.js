import db from "../database/Database.js";
import Asistencia from "../entities/Asistencia.js";

class AsistenciaRepository {

    async crear(asistencia) {
        const result = await db.execute(`
            INSERT INTO asistencias
            (id_recoleccion,id_sesion,id_legislador,tipo_asistencia,origen,fecha_registro,observaciones)
            VALUES (?,?,?,?,?,?,?)`,
            [
                asistencia.idRecoleccion,
                asistencia.idSesion,
                asistencia.idLegislador,
                asistencia.tipoAsistencia,
                asistencia.origen,
                asistencia.fechaRegistro,
                asistencia.observaciones
            ]);
        asistencia.id = result.insertId;
        return asistencia;
    }

    async actualizar(asistencia) {
        await db.execute(`
            UPDATE asistencias
               SET tipo_asistencia=?,
                   origen=?,
                   observaciones=?,
                   updated_at=NOW()
             WHERE id=?`,
            [asistencia.tipoAsistencia, asistencia.origen, asistencia.observaciones, asistencia.id]);
        return asistencia;
    }

    async obtenerPorId(id){
        const row = await db.first(`
            SELECT
                id,
                id_recoleccion AS idRecoleccion,
                id_sesion AS idSesion,
                id_legislador AS idLegislador,
                tipo_asistencia AS tipoAsistencia,
                origen,
                fecha_registro AS fechaRegistro,
                observaciones,
                created_at AS createdAt,
                updated_at AS updatedAt
            FROM asistencias
            WHERE id=?`, [id]);
        return row ? new Asistencia(row) : null;
    }

    async obtenerPorRecoleccionLegislador(idRecoleccion,idLegislador){
        const row = await db.first(`
            SELECT
                id,
                id_recoleccion AS idRecoleccion,
                id_sesion AS idSesion,
                id_legislador AS idLegislador,
                tipo_asistencia AS tipoAsistencia,
                origen,
                fecha_registro AS fechaRegistro,
                observaciones,
                created_at AS createdAt,
                updated_at AS updatedAt
            FROM asistencias
            WHERE id_recoleccion=? AND id_legislador=?`,
            [idRecoleccion,idLegislador]);
        return row ? new Asistencia(row) : null;
    }

    async obtenerPorRecoleccion(idRecoleccion){
        const rows = await db.query(`
            SELECT
                id,
                id_recoleccion AS idRecoleccion,
                id_sesion AS idSesion,
                id_legislador AS idLegislador,
                tipo_asistencia AS tipoAsistencia,
                origen,
                fecha_registro AS fechaRegistro,
                observaciones,
                created_at AS createdAt,
                updated_at AS updatedAt
            FROM asistencias
            WHERE id_recoleccion=?
            ORDER BY id_legislador`, [idRecoleccion]);
        return rows.map(r=>new Asistencia(r));
    }

    async obtenerPorSesion(idSesion){
        const rows = await db.query(`
            SELECT
                id,
                id_recoleccion AS idRecoleccion,
                id_sesion AS idSesion,
                id_legislador AS idLegislador,
                tipo_asistencia AS tipoAsistencia,
                origen,
                fecha_registro AS fechaRegistro,
                observaciones,
                created_at AS createdAt,
                updated_at AS updatedAt
            FROM asistencias
            WHERE id_sesion=?
            ORDER BY id_recoleccion,id_legislador`, [idSesion]);
        return rows.map(r=>new Asistencia(r));
    }

    async obtenerResumen(idRecoleccion){
        return await db.query(`
            SELECT tipo_asistencia AS tipoAsistencia,
                   COUNT(*) AS total
            FROM asistencias
            WHERE id_recoleccion=?
            GROUP BY tipo_asistencia`, [idRecoleccion]);
    }

}

export default new AsistenciaRepository();
