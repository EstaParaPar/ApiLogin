import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { PriceController } from './../controller/PriceController';
import { GroupPriceController } from './../controller/GroupPriceController';
import { Router } from 'express';

const router = Router();



// Get one user
router.get('/:id', PriceController.getById);

// update group  price
router.patch('/:id', [checkJwt, checkRole(['Admin','Doctor'])], GroupPriceController.editGroupPrice);


 
export default router;
