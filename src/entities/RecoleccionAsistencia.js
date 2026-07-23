import { EstadoRecoleccionAsistencia } from "../common/constants/EstadoRecoleccionAsistencia.js";

class RecoleccionAsistencia {

    constructor(data) {

        this.id = data.id ?? null;
        this.idSesion = data.idSesion;
        this.numero = data.numero;
        this.estadoRecoleccion = data.estadoRecoleccion ?? null;
        this.fechaInicio = data.fechaInicio ?? null;
        this.fechaFin = data.fechaFin ?? null;
        this.createdAt = data.createdAt ?? null;
        this.updatedAt = data.updatedAt ?? null;

    }

    abrir() {

        this.estadoRecoleccion = EstadoRecoleccionAsistencia.ABIERTA;
        this.fechaInicio = new Date();
        this.fechaFin = null;

    }

    cerrar() {

        this.estadoRecoleccion = EstadoRecoleccionAsistencia.CERRADA;
        this.fechaFin = new Date();

    }

}

export default RecoleccionAsistencia;