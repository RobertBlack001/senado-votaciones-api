class RegistrarVotoRequest {

    constructor(data = {}) {

        this.idLegislador = data.idLegislador;

        this.sentido = data.sentido;

    }

}

export default RegistrarVotoRequest;