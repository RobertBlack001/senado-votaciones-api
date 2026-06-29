class EstadoVotacionResponse {

    constructor(votacion, segundosRestantes) {

        this.idVotacion = votacion.id;
        this.estado = votacion.estado;
        this.segundosRestantes = segundosRestantes;

    }

}

export default EstadoVotacionResponse;