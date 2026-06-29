/**
 * Entidad del dominio.
 * Representa una votación.
 */
class Votacion {

    constructor({
        id,
        estado,
        fechaInicio,
        fechaFin
    }) {

        this.id = id;

        this.estado = estado;

        this.fechaInicio = fechaInicio;

        this.fechaFin = fechaFin;

    }

}

export default Votacion;