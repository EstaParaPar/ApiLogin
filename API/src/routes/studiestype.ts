import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { StudiesTypeController } from './../controller/StudiesTypeController';
import { Router } from 'express';

const router = Router();

// Get all studies type
router.get('/', StudiesTypeController.getAll);

// Get one studies type

// Create a new studies type

// Edit studies type

// Delete


export default router;
