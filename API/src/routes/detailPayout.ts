import { checkRole } from '../middlewares/role';
import { checkJwt } from '../middlewares/jwt';
import { PayoutController } from '../controller/PayoutController';
import { Router } from 'express';

const router = Router();
// Get Payout By Doctor

router.get('/:id', PayoutController.getDetailPayout);

// Create a new payout




export default router;