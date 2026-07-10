import EstadoVotacion from '../common/enums/EstadoVotacion.js';
import { MINUTE } from '../common/constants/Time.js';

class Votacion {

    constructor({
        id,
        asunto,
        duracionSegundos,
        estado,
        fechaInicio,
        fechaFin
    }) {

        this.id = id;
        this.asunto = asunto;
        this.duracionSegundos = duracionSegundos;
        this.estado = estado;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;

    }

    abrir(fechaInicio, duracionSegundos) {

        this.duracionSegundos = duracionSegundos;

        this.fechaInicio = fechaInicio;

        this.fechaFin = new Date(
            fechaInicio.getTime() + (duracionSegundos * MINUTE)
        );

        this.estado = EstadoVotacion.ABIERTA;

    }

    cerrar() {

        this.estado = EstadoVotacion.CERRADA;

    }

}

export default Votacion;