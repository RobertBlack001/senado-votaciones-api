import VotacionRepository from '../repositories/VotacionRepository.js';
import DateUtils from '../utils/DateUtils.js';
import EstadoVotacionResponse from '../dtos/responses/EstadoVotacionResponse.js';
import NotFoundException from '../exceptions/NotFoundException.js';
import ConflictException from '../exceptions/ConflictException.js';
import { DURACION_DEFAULT_MINUTOS } from '../common/constants/Votacion.js';

class VotacionService {

    async obtenerEstado(id) {

        const votacion = await VotacionRepository.getById(id);

        if (!votacion) {
            throw new NotFoundException(
                `No existe la votación con id ${id}.`
            );
        }

        let segundosRestantes = 0;

        if (votacion.fechaFin) {

            segundosRestantes = DateUtils.secondsBetween(
                DateUtils.now(),
                votacion.fechaFin
            );

        }

        return new EstadoVotacionResponse(
            votacion,
            segundosRestantes
        );

    }

    async abrir(id, request) {

        const votacion = await VotacionRepository.getById(id);

        if (!votacion) {
            throw new NotFoundException(
                `No existe la votación con id ${id}.`
            );
        }

        const votacionAbierta = await VotacionRepository.getOpen();

        if (votacionAbierta && votacionAbierta.id !== votacion.id) {

            throw new ConflictException(
                'Existe otra votación abierta.'
            );

        }

        if (votacion.estado !== 'ABIERTA') {

            const duracionMinutos = request.duracionMinutos ?? DURACION_DEFAULT_MINUTOS;

            votacion.abrir(
                DateUtils.now(),
                duracionMinutos
            );

            await VotacionRepository.update(votacion);

            // TODO:
            // Publicar evento MQTT senado/votacion/estado

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