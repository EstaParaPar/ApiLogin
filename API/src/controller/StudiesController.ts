import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Studies } from '../entity/Studies';
import { validate } from 'class-validator';
import { Patients } from '../entity/Patients';
import { StudiesType } from '../entity/StudiesType';


export class StudiesController {
  

  static getAll = async (req: Request, res: Response) => {
    const StudiesRepository = getRepository(Studies);
    let studies;

    try {
      studies = await StudiesRepository.find({select: ['id', 'technician', 'doctor', 'studieType', 'machine', 'payOut', 'state', 'currentPrice', 'idPatients', 'idHealthInsurance']});
    } catch (e) {
      res.status(404).json({message: 'Somenthing goes wrong!'});
    }

    if (studies.length > 0) {
      res.send(studies);
    } else {
      res.status(404).json({message: 'Not resultsss'});
    }
  }

  static new = async (req: Request, res: Response) => {
    const { study, machine,doctor, name, dni , lastname, newPatient,patient,healthinsurance, date} = req.body;
    const studysave = new Studies();
    const patients = new Patients();
    let newPatients = 0;
    let newSavePatient;
    let idPatients;

    const patientRepository = getRepository(Patients);
    newPatients = newPatient;
    if (newPatients == 1) {
      patients.name = name;
      patients.dni = dni;
      patients.lastname = lastname;
      await patientRepository.save(patients);
      newSavePatient = await patientRepository.find({
        select: ['id'],
        where: {
          dni: patients.dni
        }
      });
      idPatients = newSavePatient.id;

    } else {
      idPatients=patient
    }
    const StudieTypeRepository = getRepository(StudiesType)
    let studyPrice = await StudieTypeRepository.findOne({
      select: ['price'],
      where: {
        id: study
      }
    });
    

    
    studysave.doctor = doctor;
    studysave.studieType = study;
    studysave.machine = machine;
    studysave.idPatients = idPatients;
    studysave.state = 1;
    studysave.currentPrice = studyPrice.price;
    studysave.idHealthInsurance = healthinsurance;
    studysave.studyDate = date;
    
    const StudiesRepository = getRepository(Studies);
    try {
      await StudiesRepository.save(studysave);
    } catch (e) {
      return res.status(409).json({ message: e });
    }
    // All ok
    res.send('Estudio agregado');
  };
}


export default StudiesController;