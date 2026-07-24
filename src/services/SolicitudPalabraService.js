import SolicitudPalabraRepository from "../repositories/SolicitudPalabraRepository.js";
import SolicitudPalabraMQTTService from "./SolicitudPalabraMQTTService.js";

import SolicitudPalabra from "../entities/SolicitudPalabra.js";

import EstadoSolicitudPalabra from "../common/constants/EstadoSolicitudPalabra.js";

import NotFoundException from "../exceptions/NotFoundException.js";
import ConflictException from "../exceptions/ConflictException.js";
import db from "../database/Database.js";

class SolicitudPalabraService {

    async registrar(idSesion, request) {

        const existeSesion =
            await db.existsById(
                "sesiones",
                idSesion
            );

        if (!existeSesion) {

            throw new NotFoundException(
                `No existe la sesión con id ${idSesion}.`
            );

        }

        const existeLegislador =
            await db.existsById(
                "legisladores",
                request.idLegislador
            );

        if (!existeLegislador) {

            throw new NotFoundException(
                `No existe el legislador con id ${request.idLegislador}.`
            );

        }

        let solicitud =
            await SolicitudPalabraRepository.obtenerPendientePorSesionLegislador(
                idSesion,
                request.idLegislador
            );

        if (solicitud) {

            throw new ConflictException(
                "El legislador ya cuenta con una solicitud pendiente."
            );

        }

        solicitud = new SolicitudPalabra({
            idSesion: idSesion,
            idLegislador: request.idLegislador,
            estado: EstadoSolicitudPalabra.PENDIENTE
        });

        solicitud =
            await SolicitudPalabraRepository.crear(
                solicitud
            );

        await SolicitudPalabraMQTTService.publicarSolicitudRegistrada(
            solicitud
        );

        return solicitud;

    }

    async aceptar(idSolicitud) {

        const solicitud =
            await SolicitudPalabraRepository.obtenerPorId(idSolicitud);

        if (!solicitud) {

            throw new NotFoundException(
                `No existe la solicitud con id ${idSolicitud}.`
            );

        }

        if (
            solicitud.estado === EstadoSolicitudPalabra.CANCELADO
        ) {

            throw new ConflictException(
                "La solicitud ya fue cancelada."
            );

        }

        if (
            solicitud.estado === EstadoSolicitudPalabra.ACEPTADO
        ) {

            throw new ConflictException(
                "La solicitud ya fue aceptada."
            );

        }

        solicitud.estado =
            EstadoSolicitudPalabra.ACEPTADO;

        await SolicitudPalabraRepository.actualizarEstado(
            solicitud.id,
            solicitud.estado
        );

        await SolicitudPalabraMQTTService.publicarSolicitudAceptada(
            solicitud
        );

        return solicitud;

    }

    async cancelar(idSolicitud) {

        const solicitud =
            await SolicitudPalabraRepository.obtenerPorId(idSolicitud);

        if (!solicitud) {

            throw new NotFoundException(
                `No existe la solicitud con id ${idSolicitud}.`
            );

        }

        if (
            solicitud.estado === EstadoSolicitudPalabra.CANCELADO
        ) {

            throw new ConflictException(
                "La solicitud ya fue cancelada."
            );

        }

        solicitud.estado =
            EstadoSolicitudPalabra.CANCELADO;

        await SolicitudPalabraRepository.actualizarEstado(
            solicitud.id,
            solicitud.estado
        );

        await SolicitudPalabraMQTTService.publicarSolicitudCancelada(
            solicitud
        );

        return solicitud;

    }

    async listarPorSesion(idSesion) {

        return await SolicitudPalabraRepository.obtenerPorSesion(
            idSesion
        );

    }

    async listarPendientes(idSesion) {

        return await SolicitudPalabraRepository.obtenerPendientes(
            idSesion
        );

    }

}

export default new SolicitudPalabraService();