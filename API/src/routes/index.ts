import { Router } from 'express';
import auth from './auth';
import user from './user';
import machine from './machine';

const routes = Router();

routes.use('/auth', auth);
routes.use('/users', user);
routes.use('/machine', machine);

export default routes;
