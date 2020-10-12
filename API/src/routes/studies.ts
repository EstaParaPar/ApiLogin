import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { StudiesController } from './../controller/StudiesController';
import { Router } from 'express';

const router = Router();
// Create a new study
router.post('/', [checkJwt, checkRole(['Tecnico'])], StudiesController.new);

// get last study

router.get('/:id',  StudiesController.getById);

router.patch('/:id', [checkJwt, checkRole(['Tecnico'])], StudiesController.edit);


export default router;
