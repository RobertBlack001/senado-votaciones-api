import votaciones from '../data/votaciones.js';

class VotacionRepository {

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