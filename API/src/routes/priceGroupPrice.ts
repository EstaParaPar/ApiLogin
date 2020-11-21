import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { PriceController } from './../controller/PriceController';
import { Router } from 'express';

const router = Router();



// Get one user
router.get('/:id', PriceController.getById);

// Create a new Group price



export default router;
