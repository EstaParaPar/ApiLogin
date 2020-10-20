import {getRepository} from 'typeorm';
import { Request, Response } from 'express';
import { Studies } from '../entity/Studies';



export class StudiesListController {
  static getStudiesTecnico = async (req: Request, res: Response) => {
    const { id } = req.params;
    let studies;

    try {



      studies = await getRepository(Studies)
        .createQueryBuilder('studies')
        .innerJoinAndSelect('studies.doctor', 'doctorData')
        .innerJoinAndSelect('studies.technician', 'technicianData')
        .innerJoinAndSelect('studies.studieType', 'sTypeData')
        .innerJoinAndSelect('studies.machine', 'machineData')
        .innerJoinAndSelect('studies.idHealthInsurance', 'hInsuranceData')
        .innerJoinAndSelect('studies.idPatients', 'patientsData')
        .select(['studies',
          'doctorData.name', 'doctorData.lastname',
          'technicianData.name', 'technicianData.lastname',
          'sTypeData.name', 'sTypeData.id',
          'machineData.name',
          'hInsuranceData.name',
          'patientsData.name', 'patientsData.lastname',
          'patientsData.dni'
        ])
        .where('studies.technician = :id', { id })
        .getMany();


    } catch (e) {
      res.status(404).json({ message: 'Somenthing goes wrong!' });
    }

    if (studies.length > 0) {
      res.send(studies);
    } else {
      res.status(404).json({ message: 'Not result' });
    }
  }
  

  static getStudiesByDoctor = async (req: Request, res: Response) => {
    const { id } = req.params;
    let studies;

    try {



      studies = await getRepository(Studies)
        .createQueryBuilder('studies')
        .innerJoinAndSelect('studies.doctor', 'doctorData')
        .innerJoinAndSelect('studies.technician', 'technicianData')
        .innerJoinAndSelect('studies.studieType', 'sTypeData')
        .innerJoinAndSelect('studies.machine', 'machineData')
        .innerJoinAndSelect('studies.idHealthInsurance', 'hInsuranceData')
        .innerJoinAndSelect('studies.idPatients', 'patientsData')
        .select(['studies',
          'doctorData.name', 'doctorData.lastname',
          'technicianData.name', 'technicianData.lastname',
          'sTypeData.name', 'sTypeData.id',
          'machineData.name',
          'hInsuranceData.name',
          'patientsData.name', 'patientsData.lastname',
          'patientsData.dni'
        ])
        .where('studies.doctor = :id', { id })
        .getMany();


    } catch (e) {
      res.status(404).json({ message: 'Somenthing goes wrong!' });
    }

    if (studies.length > 0) {
      res.send({ studies });
    } else {
      res.status(404).json({ message: 'Not result' });
    }
  }

  static getStudiesByDoctorAndTech = async (req: Request, res: Response) => {
    const { id } = req.params;
    let studies;
    const { idTech } = req.body;
    try {
      studies = await getRepository(Studies)
        .createQueryBuilder('studies')
        .innerJoinAndSelect('studies.doctor', 'doctorData')
        .innerJoinAndSelect('studies.technician', 'technicianData')
        .innerJoinAndSelect('studies.studieType', 'sTypeData')
        .innerJoinAndSelect('studies.machine', 'machineData')
        .innerJoinAndSelect('studies.idHealthInsurance', 'hInsuranceData')
        .innerJoinAndSelect('studies.idPatients', 'patientsData')
        .select(['studies',
          'doctorData.name', 'doctorData.lastname',
          'technicianData.name', 'technicianData.lastname', 'technicianData.id',
          'sTypeData.name', 'sTypeData.id',
          'machineData.name',
          'hInsuranceData.name',
          'patientsData.name', 'patientsData.lastname',
          'patientsData.dni'
        ])
        .where('studies.doctor = :id', { id })
        .where('studies.techinician = :idTech', { idTech })
        .where('studies.state=2')
        .getMany();
  
  
    } catch (e) {
      res.status(404).json({ message: 'Somenthing goes wrong!' });
    }
  
    res.send(studies);
  
  }

  static getStudiesByPayout = async (req: Request, res: Response) => {
    const { id } = req.params;
    let studies;

    try {
      studies = await getRepository(Studies)
        .createQueryBuilder('studies')
        .innerJoinAndSelect('studies.doctor', 'doctorData')
        .innerJoinAndSelect('studies.technician', 'technicianData')
        .innerJoinAndSelect('studies.studieType', 'sTypeData')
        .innerJoinAndSelect('studies.machine', 'machineData')
        .innerJoinAndSelect('studies.idHealthInsurance', 'hInsuranceData')
        .innerJoinAndSelect('studies.idPatients', 'patientsData')
        .select(['studies',
          'doctorData.name', 'doctorData.lastname', 'doctorData.lastname',
          'technicianData.name', 'technicianData.lastname',
          'sTypeData.name', 'sTypeData.id',
          'machineData.name',
          'hInsuranceData.name',
          'patientsData.name', 'patientsData.lastname',
          'patientsData.dni'
        ])
        .where('studies.payout = :id', { id })
        .getMany();


    } catch (e) {
      res.status(404).json({ message: 'Somenthing goes wrong!' });
    }
    res.send(studies);
  }

  static getStudiesByDoctorToPayout = async (req: Request, res: Response) => {
    const { id } = req.params;
    let studies;
    try {
      studies = await getRepository(Studies)
        .createQueryBuilder('studies')
        .innerJoinAndSelect('studies.doctor', 'doctorData')
        .innerJoinAndSelect('studies.technician', 'technicianData')
        .innerJoinAndSelect('studies.studieType', 'sTypeData')
        .innerJoinAndSelect('studies.machine', 'machineData')
        .innerJoinAndSelect('studies.idHealthInsurance', 'hInsuranceData')
        .innerJoinAndSelect('studies.idPatients', 'patientsData')
        .select(['studies',
          'doctorData.name', 'doctorData.lastname',
          'technicianData.name', 'technicianData.lastname', 'technicianData.id',
          'sTypeData.name', 'sTypeData.id',
          'machineData.name',
          'hInsuranceData.name',
          'patientsData.name', 'patientsData.lastname',
          'patientsData.dni'
        ])
        .where('studies.doctor = :id', { id })
        .where('studies.state=2')
        .getMany();


    } catch (e) {
      res.status(404).json({ message: 'Somenthing goes wrong!' });
    }

    res.send(studies);

  }

}
export default StudiesListController


