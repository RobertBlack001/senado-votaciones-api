import { Router } from 'express';

import healthRoutes from './health.routes.js';
import votacionRoutes from './votacion.routes.js';
import asistenciaRoutes from './asistencia.routes.js';
import solicitudPalabraRoutes from "./solicitudPalabra.routes.js";

const router = Router();

router.use(healthRoutes);
router.use(votacionRoutes);
router.use(asistenciaRoutes);
router.use(solicitudPalabraRoutes);

export default router;