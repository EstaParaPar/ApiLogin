import { Router } from 'express';
import auth from './auth';
import user from './user';
import doctors from './doctors';
import patients from './patients';
import machine from './machine';
import studiestype from './studiestype';
import healthinsurance from './healthinsurance';
const routes = Router();

routes.use('/auth', auth);
routes.use('/users', user);
routes.use('/doctors', doctors);
routes.use('/machine', machine);
routes.use('/patients', patients);
routes.use('/studiesType', studiestype);
routes.use('/healthInsurance', healthinsurance);

export default routes;

