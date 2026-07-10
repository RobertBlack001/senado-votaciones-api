import votos from '../data/votos.js';

class VotoRepository {

    async getByVotacionAndSenador(
        idVotacion,
        idSenador
    ) {

        return (
            votos.find(
                voto =>
                    voto.idVotacion === Number(idVotacion) &&
                    voto.idSenador === Number(idSenador)
            ) || null
        );

    }

    async insert(voto) {

        votos.push(voto);

        return voto;

    }

    async update(voto) {

        const index = votos.findIndex(
            item =>
                item.idVotacion === voto.idVotacion &&
                item.idSenador === voto.idSenador
        );

        if (index === -1) {
            return null;
        }

        votos[index] = voto;

        return voto;

    }

    async countByVotacion(idVotacion) {

        return votos.filter(
            voto =>
                voto.idVotacion === Number(idVotacion)
        ).length;

    }

    async countByVotacionAndSentido(
        idVotacion,
        sentido
    ) {

        return votos.filter(
            voto =>
                voto.idVotacion === Number(idVotacion) &&
                voto.sentido === sentido
        ).length;

    }

}

export default new VotoRepository();