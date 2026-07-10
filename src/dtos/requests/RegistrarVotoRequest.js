class RegistrarVotoRequest {

    constructor(data = {}) {

        this.idSenador = data.idSenador;

        this.sentido = data.sentido;

    }

}

export default RegistrarVotoRequest;