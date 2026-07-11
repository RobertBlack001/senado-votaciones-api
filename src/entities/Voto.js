class Voto {

    constructor({
        id,
        idVotacion,
        idLegislador,
        sentido,
        activo
    }) {

        this.id = id;
        this.idVotacion = idVotacion;
        this.idLegislador = idLegislador;
        this.sentido = sentido;
        this.activo = activo;

    }

    static crear(data) {

        return new Voto(data);

    }

    cambiarSentido(sentido) {

        this.sentido = sentido;

    }

}

export default Voto;