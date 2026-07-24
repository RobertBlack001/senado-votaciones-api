import { Router } from "express";

import SolicitudPalabraController
    from "../controllers/SolicitudPalabraController.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Solicitudes de uso de la palabra
|--------------------------------------------------------------------------
*/

// Registrar desde tablet
router.post(
    "/api/v1/solicitudes-palabra/:idSesion",
    SolicitudPalabraController.registrar
);

// Aceptar solicitud
router.put(
    "/api/v1/solicitudes-palabra/aceptar/:id",
    SolicitudPalabraController.aceptar
);

// Cancelar solicitud
router.put(
    "/api/v1/solicitudes-palabra/cancelar/:id",
    SolicitudPalabraController.cancelar
);

// Historial por sesión
router.get(
    "/api/v1/solicitudes-palabra/sesion/:idSesion",
    SolicitudPalabraController.listarPorSesion
);

// Pendientes por sesión
router.get(
    "/api/v1/solicitudes-palabra/pendientes/:idSesion",
    SolicitudPalabraController.listarPendientes
);

export default router;