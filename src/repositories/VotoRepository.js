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

}

export default new VotoRepository();