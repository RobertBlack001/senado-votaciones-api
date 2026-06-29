import Votacion from '../entities/Votacion.js';
import DateUtils from '../utils/DateUtils.js';
import { MINUTE } from '../common/constants/Time.js';
import EstadoVotacion from '../common/enums/EstadoVotacion.js';
const ahora = DateUtils.now();

/**
 * Almacén de datos en memoria.
 *
 * Este archivo simula una base de datos.
 * Toda consulta deberá realizarse mediante el Repository.
 */
const votaciones = [

    new Votacion({

        id: 1,

        estado: EstadoVotacion.ABIERTA,

        fechaInicio: ahora,

        fechaFin: new Date(
            ahora.getTime() + (5 * MINUTE)
        )

    })

];

export default votaciones;