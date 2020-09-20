import { Router } from 'express';
import auth from './auth';
import user from './user';
import machine from './machine';
import studiestype from './studiestype';
const routes = Router();

routes.use('/auth', auth);
routes.use('/users', user);
routes.use('/machine', machine);
routes.use('/studiesType', studiestype);

export default routes;

