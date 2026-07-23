class CambiarTipoAsistenciaRequest {

    constructor(data) {

        this.tipoAsistencia = Number(data.tipoAsistencia);

        this.observaciones = data.observaciones ?? null;

    }

}

export default CambiarTipoAsistenciaRequest;