import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { MachineController } from './../controller/MachineController';
import { Router } from 'express';

const router = Router();

// Get all Machines
router.get('/',[checkJwt, checkRole(['Admin','Doctor'])], MachineController.getAll);

// Get one Machine

// Create a new Machine

// Edit Machine

// Delete


export default router;
