import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { DashboardController } from './../controller/DashboardController';
import { Router } from 'express';

const router = Router();
// Create a new study


router.get('/:id',[checkJwt, checkRole(['Admin','Doctor'])],  DashboardController.getDashDoctor);


export default router;
