import VotacionRepository from '../repositories/VotacionRepository.js';
import DateUtils from '../utils/DateUtils.js';
import NotFoundException from '../exceptions/NotFoundException.js';
import EstadoVotacionResponse from '../dtos/responses/EstadoVotacionResponse.js';

class VotacionService {

    async obtenerEstado(id) {

        const votacion = await VotacionRepository.getById(id);

        if (!votacion) {

            throw new NotFoundException(
                `No existe la votación con id ${id}.`
            );

        }

        const segundosRestantes = DateUtils.secondsBetween(
            DateUtils.now(),
            votacion.fechaFin
        );

        return new EstadoVotacionResponse(
            votacion,
            segundosRestantes
        );

    }

}

export default new VotacionService();