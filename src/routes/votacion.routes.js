import { Router } from 'express';

import asyncHandler from '../utils/asyncHandler.js';
import VotacionController from '../controllers/VotacionController.js';

const router = Router();

router.get(
    '/api/v1/votacion/:id',
    asyncHandler(
        VotacionController.obtenerEstado
    )
);

export default router;