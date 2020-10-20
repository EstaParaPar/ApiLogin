import { checkRole } from '../middlewares/role';
import { checkJwt } from '../middlewares/jwt';
import { StudiesListController } from '../controller/StudiesListController';
import { Router } from 'express';


const router = Router();

// Get all studies type
router.get('/:id', StudiesListController.getStudiesByDoctorToPayout);

// Get one

// Delete


export default router;