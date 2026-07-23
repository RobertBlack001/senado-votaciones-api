import { Router } from 'express';

import RecoleccionAsistenciaController from '../controllers/RecoleccionAsistenciaController.js';
import AsistenciaController from '../controllers/AsistenciaController.js';

const router = Router();

/*
|--------------------------------------------------------------------------
| Recolección de asistencia
|--------------------------------------------------------------------------
*/

// Abrir recolección
router.post(
    '/api/v1/asistencias/recolecciones/abrir',
    RecoleccionAsistenciaController.abrir
);

// Cerrar recolección
router.post(
    '/api/v1/asistencias/recolecciones/cerrar',
    RecoleccionAsistenciaController.cerrar
);

// Obtener recolección abierta
router.get(
    '/api/v1/asistencias/recolecciones/abierta/:idSesion',
    RecoleccionAsistenciaController.obtenerAbierta
);

// Historial de recolecciones
router.get(
    '/api/v1/asistencias/recolecciones/sesion/:idSesion',
    RecoleccionAsistenciaController.listar
);

/*
|--------------------------------------------------------------------------
| Asistencias
|--------------------------------------------------------------------------
*/

// Registrar desde tablet
router.post(
    '/api/v1/asistencias/:idSesion/tablet',
    AsistenciaController.registrarDesdeTablet
);

// Registrar desde operador
router.post(
    '/api/v1/asistencias/:idRecoleccion/operador',
    AsistenciaController.registrarDesdeOperador
);

// Cambiar tipo de asistencia
router.put(
    '/api/v1/asistencias/:id',
    AsistenciaController.cambiarTipo
);

// Resumen de una recolección
router.get(
    '/api/v1/asistencias/resumen/:idRecoleccion',
    AsistenciaController.obtenerResumen
);

// Asistencias por recolección
router.get(
    '/api/v1/asistencias/recoleccion/:idRecoleccion',
    AsistenciaController.listarPorRecoleccion
);

// Asistencias por sesión
router.get(
    '/api/v1/asistencias/sesion/:idSesion',
    AsistenciaController.listarPorSesion
);

export default router;