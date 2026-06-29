import { Router } from 'express';

import healthController from '../controllers/HealthController.js';
import asyncHandler from '../utils/asyncHandler.js';

const router = Router();

router.get(
    '/health',
    asyncHandler(
        healthController.getStatus
    )
);

export default router;