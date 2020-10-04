import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { UserController } from './../controller/UserController';
import { Router } from 'express';

const router = Router();

// Get all users
router.get('/',[checkJwt, checkRole(['Admin','Doctor'])], UserController.getAll);

// Get one user
router.get('/:id',[checkJwt, checkRole(['Admin','Doctor'])], UserController.getById);

// Create a new user
router.post('/',[checkJwt, checkRole(['Admin','Doctor'])],  UserController.new);

// Edit user
router.patch('/:id', [checkJwt, checkRole(['Admin','Doctor'])], UserController.edit);

// Delete
router.delete('/:id', [checkJwt, checkRole(['Admin','Doctor'])], UserController.delete);

export default router;
