import DateUtils from '../utils/DateUtils.js';
import VotacionRepository from '../repositories/VotacionRepository.js';
import VotoRepository from '../repositories/VotoRepository.js';
import Voto from '../entities/Voto.js';
import EstadoVotacion from '../common/enums/EstadoVotacion.js';
import SentidoVoto from '../common/enums/SentidoVoto.js';
import EstadoVotacionResponse from '../dtos/responses/EstadoVotacionResponse.js';
import NotFoundException from '../exceptions/NotFoundException.js';
import ConflictException from '../exceptions/ConflictException.js';
import { DURACION_DEFAULT_MINUTOS } from '../common/constants/Votacion.js';

class VotacionService {

    async obtenerEstado(id) {

        const votacion = await this.obtenerVotacion(id);

        const segundosRestantes = votacion.fechaFin
            ? DateUtils.secondsBetween(
                DateUtils.now(),
                votacion.fechaFin
            )
            : 0;

        return new EstadoVotacionResponse(
            votacion,
            segundosRestantes
        );

    }

    async abrir(id, request) {

        const votacion = await VotacionRepository.getById(id);

        await this.actualizarEstado(votacion);

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

    /**
     * Sincroniza el estado de la votación con la hora del servidor.
     *
     * Si la votación ya expiró, la cierra automáticamente.
     */
    async actualizarEstado(votacion) {

        if (
            votacion.estado === EstadoVotacion.ABIERTA &&
            votacion.fechaFin &&
            DateUtils.isExpired(votacion.fechaFin)
        ) {

            votacion.cerrar();

            await VotacionRepository.update(votacion);

            // TODO:
            // Publicar MQTT de cierre automático

        }

    }

    async votar(idVotacion, request) {

        const votacion =
            await this.obtenerVotacion(idVotacion);

        if (
            votacion.estado !== EstadoVotacion.ABIERTA
        ) {

            throw new ConflictException(
                'La votación se encuentra cerrada.'
            );

        }

        let voto =
            await VotoRepository.getByVotacionAndSenador(
                idVotacion,
                request.idSenador
            );

        if (voto) {

            if (voto.sentido === request.sentido) {

                return;

            }

            voto.cambiarSentido(
                request.sentido
            );

            await VotoRepository.update(voto);

        } else {

            voto = new Voto({

                idVotacion: Number(idVotacion),

                idSenador: Number(request.idSenador),

                sentido: request.sentido

            });

            await VotoRepository.insert(voto);

        }

        // TODO
        // Calcular resultados

        // TODO
        // Publicar MQTT

    }

    /**
     * Obtiene una votación válida y sincroniza su estado.
     *
     * @param {number} id
     * @returns {Promise<Votacion>}
     */
    async obtenerVotacion(id) {

        const votacion = await VotacionRepository.getById(id);

        if (!votacion) {

            throw new NotFoundException(
                `No existe la votación con id ${id}.`
            );

        }

        await this.actualizarEstado(votacion);

        return votacion;

    }

}

export default new VotacionService();