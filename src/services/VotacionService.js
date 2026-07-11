import DateUtils from '../utils/DateUtils.js';
import VotacionRepository from '../repositories/VotacionRepository.js';
import VotoRepository from '../repositories/VotoRepository.js';
import Voto from '../entities/Voto.js';

import EstadoVotacion from '../common/enums/EstadoVotacion.js';

import EstadoVotacionResponse from '../dtos/responses/EstadoVotacionResponse.js';

import NotFoundException from '../exceptions/NotFoundException.js';
import ConflictException from '../exceptions/ConflictException.js';

class VotacionService {

    async obtenerEstado(id) {

        const votacion = await this.obtenerVotacion(id);

        let segundosRestantes = 0;

        if (
            votacion.estado === EstadoVotacion.ABIERTA &&
            votacion.fechaFin
        ) {

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

    async abrir(id) {

        const votacion = await VotacionRepository.getById(id);

        if (!votacion) {

            throw new NotFoundException(
                `No existe la votación con id ${id}.`
            );

        }

        await this.actualizarEstado(votacion);

        const votacionAbierta = await VotacionRepository.getOpen();

        if (
            votacionAbierta &&
            votacionAbierta.id !== votacion.id
        ) {

            throw new ConflictException(
                'Existe otra votación abierta.'
            );

        }

        if (votacion.estado === EstadoVotacion.ABIERTA) {

            throw new ConflictException(
                'La votación ya se encuentra abierta.'
            );

        }

        if (votacion.estado === EstadoVotacion.CERRADA) {

            throw new ConflictException(
                'La votación ya fue cerrada.'
            );

        }

        votacion.abrir(
            DateUtils.now(),
            votacion.duracionSegundos
        );

        await VotacionRepository.update(votacion);

        return new EstadoVotacionResponse(
            votacion,
            votacion.duracionSegundos
        );

    }

    async votar(idVotacion, request) {

        const votacion = await this.obtenerVotacion(idVotacion);

        if (votacion.estado !== EstadoVotacion.ABIERTA) {

            throw new ConflictException(
                'La votación se encuentra cerrada.'
            );

        }

        let voto = await VotoRepository.getByVotacionAndLegislador(
            idVotacion,
            request.idLegislador
        );

        if (voto) {

            if (voto.sentido === request.sentido) {

                return;

            }

            voto.cambiarSentido(request.sentido);

            await VotoRepository.update(voto);

        } else {

            voto = new Voto({

                idVotacion: Number(idVotacion),

                idLegislador: Number(request.idLegislador),

                sentido: request.sentido,

                activo: 1

            });

            await VotoRepository.insert(voto);

        }

        // TODO
        // Calcular resultados

        // TODO
        // Publicar MQTT

    }

    async actualizarEstado(votacion) {

        if (
            votacion.estado !== EstadoVotacion.ABIERTA
        ) {

            return;

        }

        if (
            !votacion.fechaFin
        ) {

            return;

        }

        if (
            !DateUtils.isExpired(votacion.fechaFin)
        ) {

            return;

        }

        votacion.cerrar();

        await VotacionRepository.update(votacion);

        // TODO
        // Publicar MQTT de cierre automático

    }

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