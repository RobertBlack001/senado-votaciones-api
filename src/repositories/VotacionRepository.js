import votaciones from '../data/votaciones.js';
import EstadoVotacion from '../common/enums/EstadoVotacion.js';

class VotacionRepository {

    async getOpen() {

    return (
            votaciones.find(
                votacion =>
                    votacion.estado === EstadoVotacion.ABIERTA
            ) || null
        );

    }

    async getById(id) {

        return (
            votaciones.find(
                votacion => votacion.id === Number(id)
            ) || null
        );

    }

    async getAll() {

        return votaciones;

    }

    async save(votacion) {

        // Simula el comportamiento de un AUTO_INCREMENT
        const nextId = votaciones.length === 0
            ? 1
            : Math.max(...votaciones.map(item => item.id)) + 1;

        votacion.id = nextId;

        votaciones.push(votacion);

        return votacion;

    }

    async update(votacion) {

        const index = votaciones.findIndex(
            item => item.id === votacion.id
        );

        if (index === -1) {
            return null;
        }

        votaciones[index] = votacion;

        return votacion;

    }

    async delete(id) {

        const index = votaciones.findIndex(
            item => item.id === Number(id)
        );

        if (index === -1) {
            return false;
        }

        votaciones.splice(index, 1);

        return true;

    }

}

export default new VotacionRepository();