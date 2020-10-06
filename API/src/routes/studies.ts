import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { StudiesController } from './../controller/StudiesController';
import { Router } from 'express';

const router = Router();
// Create a new study
router.post('/',[checkJwt, checkRole(['Admin','Doctor'])],  StudiesController.new);

export default router;