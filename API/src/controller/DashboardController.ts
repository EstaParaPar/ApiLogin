import {getRepository} from 'typeorm';
import { Request, Response } from 'express';
import { Studies } from '../entity/Studies';



export class DashboardController {
  static getDashTecnico = async (req: Request, res: Response) => {
    const { id } = req.params;
    let studiesPending;
    let studiesConfirm;
    let studiesFinish;

    try {
      studiesPending = await getRepository(Studies)
        .createQueryBuilder('studies')
        .select(['studies'])
        .where('studies.technician = :id', { id })
        .where('studies.state =1')
        .getCount();

      studiesConfirm = await getRepository(Studies)
        .createQueryBuilder('studies')
        .select(['studies'])
        .where('studies.technician = :id', { id })
        .where('studies.state = 2')
        .getCount();

      studiesFinish = await getRepository(Studies)
        .createQueryBuilder('studies')
        .select(['studies'])
        .where('studies.technician = :id', { id })
        .where('studies.state = 3')
        .getCount();



    } catch (e) {
      res.status(404).json({message: 'Somenthing goes wrong!'});
    }


    res.send({studiesPending,studiesConfirm,studiesFinish});

  }


}
export default DashboardController


