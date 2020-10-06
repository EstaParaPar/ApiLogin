import {Column, CreateDateColumn,createQueryBuilder, getRepository, JoinColumn, ManyToOne, UpdateDateColumn} from 'typeorm';
import { Request, Response } from 'express';
import { Studies } from '../entity/Studies';
import {validate} from "class-validator";
import {Users} from "../entity/Users";
import {StudiesType} from "../entity/StudiesType";
import {Machine} from "../entity/Machine";
import {PayOut} from "../entity/PayOut";
import {Patients} from "../entity/Patients";
import {HealthInsurance} from "../entity/HealthInsurance";


export class StudiesTecnicoController {
  static getAll = async (req: Request, res: Response) => {
    const { id } = req.params;
    const studiesRepository = getRepository(Studies);
    const userRepository = getRepository(Users);
    let studies;
    let doctor;

    try {

     // https://github.com/typeorm/typeorm/blob/master/docs/find-options.md
      /*studies = await studiesRepository.find({
        select: [
          'id', 'technician', 'doctor', 'studieType', 'machine', 'payOut', 'state', 'currentPrice', 'idPatients', 'idHealthInsurance'
        ],
          where: {
            technician: id
          },
        relations:['doctor','machine', 'studieType', 'idPatients']
      });*/
      // doctor  = await userRepository.findOneOrFail(studies.doctor);

  studies = await studiesRepository.find({
    join: {
    alias: "studies",
    leftJoinAndSelect: {
      doctor: "studies.doctor"
    }
  }
});

} catch (e) {
res.status(404).json({message: 'Somenthing goes wrong!'});
}

if (studies.length > 0) {
res.send({studies});
} else {
res.status(404).json({message: 'Not result'});
}
}



}
export default StudiesTecnicoController


