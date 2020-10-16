import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { PayoutController } from './../controller/PayoutController';
import { Router } from 'express';

const router = Router();
// Get Payout By Doctor

router.get('/:id', [checkJwt, checkRole(['Doctor'])], PayoutController.getListPayoutByDoctor);

// Create a new payout

router.post('/', [checkJwt, checkRole(['Doctor'])], PayoutController.new);


export default router;