class Asistencia {

    constructor(data) {

        this.id = data.id;
        this.idRecoleccion = data.idRecoleccion;
        this.idSesion = data.idSesion;
        this.idLegislador = data.idLegislador;
        this.tipoAsistencia = data.tipoAsistencia;
        this.origen = data.origen;
        this.fechaRegistro = data.fechaRegistro;
        this.observaciones = data.observaciones;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;

    }

}

export default Asistencia;