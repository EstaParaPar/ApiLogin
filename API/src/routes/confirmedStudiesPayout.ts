import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { PayoutController } from './../controller/PayoutController';
import { Router } from 'express';

const router = Router();
// Create a new payout

router.post('/', [checkJwt, checkRole(['Doctor'])], PayoutController.new);


export default router;