import AsistenciaService from '../services/AsistenciaService.js';
import Response from '../utils/Response.js';

import RegistrarAsistenciaRequest from '../dtos/requests/RegistrarAsistenciaRequest.js';
import RegistrarAsistenciaOperadorRequest from '../dtos/requests/RegistrarAsistenciaOperadorRequest.js';
import CambiarTipoAsistenciaRequest from '../dtos/requests/CambiarTipoAsistenciaRequest.js';

class AsistenciaController {

    async registrarDesdeTablet(req, res) {

        const request = new RegistrarAsistenciaRequest(
            req.body
        );

        const data =
            await AsistenciaService.registrarDesdeTablet(
                Number(req.params.idSesion),
                request
            );

        return Response.success(
            res,
            data,
            'Asistencia registrada correctamente.'
        );

    }

    async registrarDesdeOperador(req, res) {

        const request =
            new RegistrarAsistenciaOperadorRequest(
                req.body
            );

        const data =
            await AsistenciaService.registrarDesdeOperador(
                Number(req.params.idRecoleccion),
                request
            );

        return Response.success(
            res,
            data,
            'Asistencia registrada correctamente.'
        );

    }

    async cambiarTipo(req, res) {

        const request =
            new CambiarTipoAsistenciaRequest(
                req.body
            );

        const data =
            await AsistenciaService.cambiarTipoAsistencia(
                Number(req.params.id),
                request.tipoAsistencia,
                request.observaciones
            );

        return Response.success(
            res,
            data,
            'Tipo de asistencia actualizado correctamente.'
        );

    }

    async obtenerResumen(req, res) {

        const data =
            await AsistenciaService.obtenerResumen(
                Number(req.params.idRecoleccion)
            );

        return Response.success(
            res,
            data
        );

    }

    async listarPorRecoleccion(req, res) {

        const data =
            await AsistenciaService.listarPorRecoleccion(
                Number(req.params.idRecoleccion)
            );

        return Response.success(
            res,
            data
        );

    }

    async listarPorSesion(req, res) {

        const data =
            await AsistenciaService.listarPorSesion(
                Number(req.params.idSesion)
            );

        return Response.success(
            res,
            data
        );

    }

}

export default new AsistenciaController();