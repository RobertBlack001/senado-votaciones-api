import RecoleccionAsistenciaService from '../services/RecoleccionAsistenciaService.js';
import Response from '../utils/Response.js';

class RecoleccionAsistenciaController {

    async abrir(req, res) {

        const { idSesion } = req.body;

        const data =
            await RecoleccionAsistenciaService.abrir(
                Number(idSesion)
            );

        return Response.success(
            res,
            data,
            'Recolección de asistencia iniciada correctamente.'
        );

    }

    async cerrar(req, res) {

        const { idSesion } = req.body;

        const data =
            await RecoleccionAsistenciaService.cerrar(
                Number(idSesion)
            );

        return Response.success(
            res,
            data,
            'Recolección de asistencia cerrada correctamente.'
        );

    }

    async obtenerAbierta(req, res) {

        const { idSesion } = req.params;

        const data =
            await RecoleccionAsistenciaService.obtenerAbierta(
                Number(idSesion)
            );

        return Response.success(
            res,
            data
        );

    }

    async listar(req, res) {

        const { idSesion } = req.params;

        const data =
            await RecoleccionAsistenciaService.listar(
                Number(idSesion)
            );

        return Response.success(
            res,
            data
        );

    }

}

export default new RecoleccionAsistenciaController();
