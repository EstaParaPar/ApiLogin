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
import dashTeach from './dashboardTech';
import studiesdoctortech from './studiesdoctortech';
import techs from './techs';
import confirmPayout from './confirmedStudiesPayout';
import dashDoctor from './dashboardDoctor';


const routes = Router();

routes.use('/auth', auth);
routes.use('/users', user);
routes.use('/doctors', doctors);
routes.use('/techs', techs);
routes.use('/machine', machine);
routes.use('/patients', patients);
routes.use('/studiesType', studiestype);
routes.use('/healthInsurance', healthinsurance);
routes.use('/studiesTech', studiesTech);
routes.use('/studies', studies);
routes.use('/deleteStudy', deleteStudy);
routes.use('/confirmStudy', confirmStudy);
routes.use('/dashTech', dashTeach);
routes.use('/dashDoctor', dashDoctor);
routes.use('/studiesdoctortech', studiesdoctortech );
routes.use('/confirmedStudiesPayout', confirmPayout);


export default routes;

