import { Router } from 'express';
import auth from './auth';
import user from './user';
import doctors from './doctors';
import patients from './patients';
import machine from './machine';
import studiestype from './studiestype';
import healthinsurance from './healthinsurance';
import studiesTech from './studiesTech';
import studies from './studies';
import deleteStudy from './deleteStudy';
import confirmStudy from './confirmStudy';


const routes = Router();

routes.use('/auth', auth);
routes.use('/users', user);
routes.use('/doctors', doctors);
routes.use('/machine', machine);
routes.use('/patients', patients);
routes.use('/studiesType', studiestype);
routes.use('/healthInsurance', healthinsurance);
routes.use('/studiesTech', studiesTech);
routes.use('/studies', studies);
routes.use('/deleteStudy', deleteStudy);
routes.use('/confirmStudy', confirmStudy);
export default routes;

