import EstadoVotacion from '../common/enums/EstadoVotacion.js';
import { MINUTE } from '../common/constants/Time.js';

class Votacion {

    constructor({
        id,
        asunto,
        duracionMinutos,
        estado,
        fechaInicio,
        fechaFin
    }) {

        this.id = id;
        this.asunto = asunto;
        this.duracionMinutos = duracionMinutos;
        this.estado = estado;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;

    }

    abrir(fechaInicio, duracionMinutos) {

        this.duracionMinutos = duracionMinutos;

        this.fechaInicio = fechaInicio;

        this.fechaFin = new Date(
            fechaInicio.getTime() + (duracionMinutos * MINUTE)
        );

        this.estado = EstadoVotacion.ABIERTA;

    }

    cerrar() {

        this.estado = EstadoVotacion.CERRADA;

    }

}

export default Votacion;