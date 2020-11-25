import { checkRole } from '../middlewares/role';
import { checkJwt } from '../middlewares/jwt';
import { PriceController } from '../controller/PriceController';
import { GroupPriceController } from '../controller/GroupPriceController';
import { Router } from 'express';

const router = Router();



// Get prices for a single studie
router.get('/:id', PriceController.getByStudie);

// update group  price
router.patch('/:id', [checkJwt, checkRole(['Admin','Doctor'])], GroupPriceController.editGroupPrice);


 
export default router;
