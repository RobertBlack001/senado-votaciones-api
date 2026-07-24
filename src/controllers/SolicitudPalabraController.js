import SolicitudPalabraService from "../services/SolicitudPalabraService.js";
import Response from "../utils/Response.js";

import RegistrarSolicitudPalabraRequest
    from "../dtos/requests/RegistrarSolicitudPalabraRequest.js";

class SolicitudPalabraController {

    async registrar(req, res) {

        const request =
            new RegistrarSolicitudPalabraRequest(
                req.body
            );

        const data =
            await SolicitudPalabraService.registrar(
                Number(req.params.idSesion),
                request
            );

        return Response.success(
            res,
            data,
            "Solicitud registrada correctamente."
        );

    }

    async aceptar(req, res) {

        const data =
            await SolicitudPalabraService.aceptar(
                Number(req.params.id)
            );

        return Response.success(
            res,
            data,
            "Solicitud aceptada correctamente."
        );

    }

    async cancelar(req, res) {

        const data =
            await SolicitudPalabraService.cancelar(
                Number(req.params.id)
            );

        return Response.success(
            res,
            data,
            "Solicitud cancelada correctamente."
        );

    }

    async listarPorSesion(req, res) {

        const data =
            await SolicitudPalabraService.listarPorSesion(
                Number(req.params.idSesion)
            );

        return Response.success(
            res,
            data
        );

    }

    async listarPendientes(req, res) {

        const data =
            await SolicitudPalabraService.listarPendientes(
                Number(req.params.idSesion)
            );

        return Response.success(
            res,
            data
        );

    }

}

export default new SolicitudPalabraController();