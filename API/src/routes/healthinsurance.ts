import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { HealthInsuranceController } from './../controller/HealthInsuranceController';
import { Router } from 'express';

const router = Router();

// Get all HealthInsurance
router.get('/',HealthInsuranceController.getAll);

// Get one HealthInsurance

// Create a new HealthInsurance

// Create a new user
router.post('/',[checkJwt, checkRole(['Admin','Doctor', 'Tecnico'])],  HealthInsuranceController.new);

// Edit HealthInsurance

// Delete


export default router;
