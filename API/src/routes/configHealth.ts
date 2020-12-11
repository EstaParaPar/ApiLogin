
import { ConfigHealthInsuranceController } from './../controller/ConfigHealthInsuranceController';
import { Router } from 'express';

const router = Router();

// Get all users
router.get('/', ConfigHealthInsuranceController.setAll);



export default router;
