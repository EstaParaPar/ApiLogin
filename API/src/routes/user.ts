import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { UserController } from './../controller/UserController';
import { Router } from 'express';

const router = Router();

// Get all users
router.get('/',[checkJwt, checkRole(['Admin'])], UserController.getAll);

// Get one user
router.get('/:id',[checkJwt, checkRole(['Admin',])], UserController.getById);

// Create a new user
router.post('/',[checkJwt, checkRole(['Admin'])],  UserController.new);

// Edit user
router.patch('/:id', [checkJwt, checkRole(['Admin'])], UserController.edit);

// Delete
router.delete('/:id', [checkJwt, checkRole(['Admin'])], UserController.delete);

export default router;
