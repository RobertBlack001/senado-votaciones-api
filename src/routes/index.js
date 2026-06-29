import { Router } from 'express';

import healthRoutes from './health.routes.js';
import votacionRoutes from './votacion.routes.js';

const router = Router();

router.use(healthRoutes);
router.use(votacionRoutes);

export default router;