import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { GroupPriceController } from './../controller/GroupPriceController';
import { Router } from 'express';
import {UserController} from "../controller/UserController";

const router = Router();

// Get all users
router.get('/', GroupPriceController.getAll);


// Get one user
router.get('/:id',[checkJwt, checkRole(['Admin','Doctor'])], GroupPriceController.getById);

// Create a new Group price
router.post('/',[checkJwt, checkRole(['Admin','Doctor'])],  GroupPriceController.new);




export default router;
