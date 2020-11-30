import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { HealthInsuranceController } from './../controller/HealthInsuranceController';
import { Router } from 'express';

const router = Router();

// Get all HealthInsurance
router.get('/', [checkJwt, checkRole(['Admin','Doctor','Tecnico'])],HealthInsuranceController.getAll);

// Get one HealthInsurance
router.get('/:id',[checkJwt, checkRole(['Admin','Doctor'])], HealthInsuranceController.getById);
// Create a new HealthInsurance

// Create a new user
router.post('/',[checkJwt, checkRole(['Admin','Doctor', 'Tecnico'])],  HealthInsuranceController.new);

// Edit HealthInsurance
router.patch('/:id', [checkJwt, checkRole(['Admin','Doctor'])], HealthInsuranceController.editHealthIns);

// Delete


export default router;
