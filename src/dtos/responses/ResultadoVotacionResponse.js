class ResultadoVotacionResponse {

    constructor(
        votacion,
        resultados
    ) {

        this.idVotacion = votacion.id;
        this.estado = votacion.estado;

        this.si = resultados.si;
        this.no = resultados.no;
        this.abstencion = resultados.abstencion;
        this.total = resultados.total;

    }

}

export default ResultadoVotacionResponse;