import DateUtils from "../utils/DateUtils.js";

import AsistenciaRepository from "../repositories/AsistenciaRepository.js";
import RecoleccionAsistenciaService from "./RecoleccionAsistenciaService.js";
import AsistenciaMQTTService from "./AsistenciaMQTTService.js";

import Asistencia from "../entities/Asistencia.js";

import { TipoAsistencia } from "../common/constants/TipoAsistencia.js";
import { OrigenAsistencia } from "../common/constants/OrigenAsistencia.js";

import NotFoundException from "../exceptions/NotFoundException.js";
import ConflictException from "../exceptions/ConflictException.js";

class AsistenciaService {

    async registrarDesdeTablet(idSesion, request) {

        const recoleccion =
            await RecoleccionAsistenciaService.obtenerAbierta(idSesion);

        if (!recoleccion) {
            throw new ConflictException(
                "No existe una recolección de asistencia abierta."
            );
        }

        let asistencia =
            await AsistenciaRepository.obtenerPorRecoleccionLegislador(
                recoleccion.id,
                request.idLegislador
            );

        if (asistencia) {
            throw new ConflictException(
                "El legislador ya registró su asistencia."
            );
        }

        asistencia = new Asistencia({
            idRecoleccion: recoleccion.id,
            idSesion: idSesion,
            idLegislador: request.idLegislador,
            tipoAsistencia: TipoAsistencia.ASISTENCIA,
            origen: OrigenAsistencia.TABLET,
            fechaRegistro: DateUtils.now(),
            observaciones: null
        });

        asistencia = await AsistenciaRepository.crear(asistencia);

        await AsistenciaMQTTService.publicarAsistenciaRegistrada(asistencia);

        return asistencia;

    }

    async registrarDesdeOperador(idRecoleccion, request) {

        let asistencia =
            await AsistenciaRepository.obtenerPorRecoleccionLegislador(
                idRecoleccion,
                request.idLegislador
            );

        if (asistencia) {

            asistencia.tipoAsistencia = request.tipoAsistencia;
            asistencia.origen = OrigenAsistencia.OPERADOR;
            asistencia.observaciones = request.observaciones ?? null;

            asistencia = await AsistenciaRepository.actualizar(asistencia);

            await AsistenciaMQTTService.publicarTipoAsistenciaActualizado(asistencia);

            return asistencia;

        }

        asistencia = new Asistencia({
            idRecoleccion: idRecoleccion,
            idSesion: request.idSesion,
            idLegislador: request.idLegislador,
            tipoAsistencia: request.tipoAsistencia,
            origen: OrigenAsistencia.OPERADOR,
            fechaRegistro: DateUtils.now(),
            observaciones: request.observaciones ?? null
        });

        asistencia = await AsistenciaRepository.crear(asistencia);

        await AsistenciaMQTTService.publicarAsistenciaRegistrada(asistencia);

        return asistencia;

    }

    async cambiarTipoAsistencia(idAsistencia, tipoAsistencia, observaciones = null) {

        const asistencia = await AsistenciaRepository.obtenerPorId(idAsistencia);

        if (!asistencia) {
            throw new NotFoundException(
                `No existe la asistencia con id ${idAsistencia}.`
            );
        }

        asistencia.tipoAsistencia = tipoAsistencia;
        asistencia.origen = OrigenAsistencia.OPERADOR;
        asistencia.observaciones = observaciones;

        await AsistenciaRepository.actualizar(asistencia);

        await AsistenciaMQTTService.publicarTipoAsistenciaActualizado(asistencia);

        return asistencia;

    }

    async obtenerResumen(idRecoleccion) {

        return await AsistenciaRepository.obtenerResumen(idRecoleccion);

    }

    async listarPorRecoleccion(idRecoleccion) {

        return await AsistenciaRepository.obtenerPorRecoleccion(idRecoleccion);

    }

    async listarPorSesion(idSesion) {

        return await AsistenciaRepository.obtenerPorSesion(idSesion);

    }

}

export default new AsistenciaService();
