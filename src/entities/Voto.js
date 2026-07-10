class Voto {

    constructor({
        idVotacion,
        idSenador,
        sentido
    }) {

        this.idVotacion = idVotacion;
        this.idSenador = idSenador;
        this.sentido = sentido;

    }

    static crear(data) {

        return new Voto(data);

    }

    cambiarSentido(sentido) {

        this.sentido = sentido;

    }

}

export default Voto;