import Database from '../database/Database.js';
import Voto from '../entities/Voto.js';

const SQL_GET_BY_VOTACION_AND_LEGISLADOR = `
    SELECT
        id,
        id_votacion,
        id_legislador,
        sentido,
        activo
    FROM votos
    WHERE id_votacion = ?
      AND id_legislador = ?
      AND activo = 1
    LIMIT 1;
`;

const SQL_INSERT = `
    INSERT INTO votos (

        id_votacion,
        id_legislador,
        sentido,
        activo

    ) VALUES (

        ?, ?, ?, ?

    );
`;

const SQL_UPDATE = `
    UPDATE votos
    SET

        sentido = ?,
        activo = ?,
        updated_at = NOW()

    WHERE id = ?;
`;

const SQL_GET_RESULTADOS = `
    SELECT
        SUM(CASE WHEN sentido = 1 THEN 1 ELSE 0 END) AS si,
        SUM(CASE WHEN sentido = 2 THEN 1 ELSE 0 END) AS no,
        SUM(CASE WHEN sentido = 3 THEN 1 ELSE 0 END) AS abstencion,
        COUNT(*) AS total
    FROM votos
    WHERE id_votacion = ?
    AND activo = 1;
`;

class VotoRepository {

    async getByVotacionAndLegislador(
        idVotacion,
        idLegislador
    ) {

        const row = await Database.first(

            SQL_GET_BY_VOTACION_AND_LEGISLADOR,
            [
                idVotacion,
                idLegislador
            ]

        );

        if (!row) {

            return null;

        }

        return new Voto({

            id: row.id,
            idVotacion: row.id_votacion,
            idLegislador: row.id_legislador,
            sentido: row.sentido,
            activo: row.activo

        });

    }

    async insert(voto) {

        const result = await Database.execute(

            SQL_INSERT,
            [
                voto.idVotacion,
                voto.idLegislador,
                voto.sentido,
                voto.activo

            ]

        );

        voto.id = result.insertId;

    }

    async update(voto) {

        await Database.execute(

            SQL_UPDATE,
            [
                voto.sentido,
                voto.activo,
                voto.id
            ]

        );

    }

    async obtenerResultados(idVotacion) {

        const row = await Database.first(
            SQL_GET_RESULTADOS,
            [idVotacion]
        );

        return {

            si: Number(row.si ?? 0),
            no: Number(row.no ?? 0),
            abstencion: Number(row.abstencion ?? 0),
            total: Number(row.total ?? 0)

        };

    }

}

export default new VotoRepository();