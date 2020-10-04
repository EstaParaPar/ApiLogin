import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { StudiesTypeController } from './../controller/StudiesTypeController';
import { Router } from 'express';


const router = Router();

// Get all studies type
router.get('/',[checkJwt, checkRole(['Admin','Doctor'])], StudiesTypeController.getAll);

// Get one studies type
// Get one user
router.get('/:id',[checkJwt, checkRole(['Admin','Doctor'])], StudiesTypeController.getById);

// Create a new studies type

// Edit studies type
// Edit user
router.patch('/:id', [checkJwt, checkRole(['Admin','Doctor'])], StudiesTypeController.edit);


// Delete


export default router;
