import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { PatientsController } from './../controller/PatienceController';
import { Router } from 'express';

const router = Router();

// Get all Patients
router.get('/',PatientsController.getAll);

// Get one Patients

// Create a new Patients

// Create a new Patients
router.post('/',[checkJwt, checkRole(['Admin','Doctor', 'Tecnico'])],  PatientsController.new);

// Edit Patients

// Delete


export default router;
