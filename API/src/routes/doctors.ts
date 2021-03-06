import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { UserController } from './../controller/UserController';
import { Router } from 'express';

const router = Router();

// Get all users
router.get('/', [checkJwt, checkRole(['Admin','Doctor','Tecnico'])],UserController.getDoctors);

// router.get('/',[checkJwt, checkRole(['Admin','Doctor'])], UserController.getAll);


export default router;
