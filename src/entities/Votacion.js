import EstadoVotacion from '../common/enums/EstadoVotacion.js';
import { SECOND } from '../common/constants/Time.js';

class Votacion {

    constructor({
        id,
        idSesion,
        asunto,
        duracionSegundos,
        estado,
        fechaInicio,
        fechaFin,
        fechaFinManual,
        observaciones
    }) {

        this.id = id;
        this.idSesion = idSesion;
        this.asunto = asunto;
        this.duracionSegundos = duracionSegundos;
        this.estado = estado;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.fechaFinManual = fechaFinManual;
        this.observaciones = observaciones;

    }

    abrir(fechaInicio, duracionSegundos) {

        this.duracionSegundos = duracionSegundos;

        this.fechaInicio = fechaInicio;

        this.fechaFin = new Date(
            fechaInicio.getTime() + (duracionSegundos * SECOND)
        );

        this.estado = EstadoVotacion.ABIERTA;

    }

    cerrar() {

        this.estado = EstadoVotacion.CERRADA;

    }

}

export default Votacion;