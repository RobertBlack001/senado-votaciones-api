class RegistrarAsistenciaOperadorRequest {

    constructor(data) {

        this.idSesion = Number(data.idSesion);

        this.idLegislador = Number(data.idLegislador);

        this.tipoAsistencia = Number(data.tipoAsistencia);

        this.observaciones = data.observaciones ?? null;

    }

}

export default RegistrarAsistenciaOperadorRequest;