

import { checkRole } from '../middlewares/role';
import { checkJwt } from '../middlewares/jwt';
import { StudiesController } from '../controller/StudiesController';
import { Router } from 'express';


const router = Router();

// Edit state
router.patch('/:id', [checkJwt, checkRole(['Tecnico'])], StudiesController.confirmStudy);


export default router;