import DateUtils from "../utils/DateUtils.js";

import RecoleccionAsistenciaRepository from "../repositories/RecoleccionAsistenciaRepository.js";
import RecoleccionAsistencia from "../entities/RecoleccionAsistencia.js";

import { EstadoRecoleccionAsistencia } from "../common/constants/EstadoRecoleccionAsistencia.js";

import NotFoundException from "../exceptions/NotFoundException.js";
import ConflictException from "../exceptions/ConflictException.js";

class RecoleccionAsistenciaService {

    async abrir(idSesion) {

        const abierta =
            await RecoleccionAsistenciaRepository.obtenerAbiertaPorSesion(idSesion);

        if (abierta) {
            throw new ConflictException(
                "Ya existe una recolección de asistencia abierta."
            );
        }

        const ultimoNumero =
            await RecoleccionAsistenciaRepository.obtenerUltimoNumero(idSesion);

        const recoleccion = new RecoleccionAsistencia({
            idSesion,
            numero: ultimoNumero + 1
        });

        recoleccion.abrir();

        return await RecoleccionAsistenciaRepository.crear(recoleccion);

    }

    async cerrar(idSesion) {

        const recoleccion =
            await RecoleccionAsistenciaRepository.obtenerAbiertaPorSesion(idSesion);

        if (!recoleccion) {
            throw new NotFoundException(
                "No existe una recolección abierta para esta sesión."
            );
        }

        recoleccion.cerrar();

        return await RecoleccionAsistenciaRepository.actualizar(recoleccion);

    }

    async obtenerAbierta(idSesion) {

        return await RecoleccionAsistenciaRepository.obtenerAbiertaPorSesion(
            idSesion
        );

    }

    async obtenerPorId(id) {

        const recoleccion =
            await RecoleccionAsistenciaRepository.obtenerPorId(id);

        if (!recoleccion) {
            throw new NotFoundException(
                `No existe la recolección de asistencia con id ${id}.`
            );
        }

        return recoleccion;

    }

    async listar(idSesion) {

        return await RecoleccionAsistenciaRepository.obtenerPorSesion(idSesion);

    }

    async obtenerUltima(idSesion) {

        return await RecoleccionAsistenciaRepository.obtenerUltimaPorSesion(
            idSesion
        );

    }

}

export default new RecoleccionAsistenciaService();
