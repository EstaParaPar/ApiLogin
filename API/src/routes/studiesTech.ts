import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { StudiesTecnicoController } from './../controller/StudiesTecnicoController';
import { Router } from 'express';


const router = Router();

// Get all studies type
router.get('/:id', StudiesTecnicoController.getAll);

// Get one

// Delete


export default router;
