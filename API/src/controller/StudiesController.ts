import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Studies } from '../entity/Studies';
import { validate } from 'class-validator';
import { Patients } from '../entity/Patients';
import { StudiesType } from '../entity/StudiesType';
import { HealthInsurance } from '../entity/HealthInsurance';


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
    const { study, machine, doctor, name, dni, lastname, newPatient, newHealth, patient, healthinsurance, date } = req.body;
    const studysave = new Studies();
    const patients = new Patients();
    const healthinsurances = new HealthInsurance();
    let newHealthIns = 0;
    let newPatients = 0;
    let newSavePatient;
    let idPatients;
    let newSaveHealth;
    let idHealthInsurance;

    const patientRepository = getRepository(Patients);
    newPatients = newPatient;
    if (newPatients == 1) {
      patients.name = name;
      patients.dni = dni;
      patients.lastname = lastname;
      newSavePatient = await patientRepository.findOne({
        select: ['id'],
        where: {
          dni: patients.dni
        }
      });
      console.log(newSavePatient);

      if (newSavePatient == null) {
        await patientRepository.save(patients);
      
        newSavePatient = await patientRepository.findOne({
          select: ['id'],
          where: {
            dni: patients.dni
          }
        });
      }
      idPatients = newSavePatient.id;

    } else {
      idPatients = patient
    }
    console.log(idPatients);

    const StudieTypeRepository = getRepository(StudiesType)
    let studyPrice = await StudieTypeRepository.findOne({
      select: ['price'],
      where: {
        id: study
      }
    });


    const healthInsuranceRepository = getRepository(HealthInsurance);
    newHealthIns = newHealth;
    if (newHealthIns == 1) {
      healthinsurances.name = healthinsurance;
      await healthInsuranceRepository.save(healthinsurances);
      newSaveHealth = await healthInsuranceRepository.findOne({
        select: ['id'],
        where: {
          name: healthinsurances.name
        }
      });
      idHealthInsurance = newSaveHealth.id;

    } else {
      idHealthInsurance = healthinsurance
    }

    
    studysave.doctor = doctor;
    studysave.studieType = study;
    studysave.machine = machine;
    studysave.idPatients = idPatients;
    studysave.state = 1;
    studysave.currentPrice = studyPrice.price;
    studysave.idHealthInsurance = idHealthInsurance;
    studysave.studyDate = date;
    
    const StudiesRepository = getRepository(Studies);
    try {
      await StudiesRepository.save(studysave);
 
    } catch (e) {
      return res.status(409).json({ message: e });
    }
    
    // All ok
    res.send(studysave);
  };
  static getById = async (req: Request, res: Response) => {
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
          'doctorData.name','doctorData.lastname',
          'technicianData.name','technicianData.lastname',
          'sTypeData.name','sTypeData.id',
          'machineData.name',
          'hInsuranceData.name',
          'patientsData.name', 'patientsData.lastname',
          'patientsData.dni'
        ])
        .where('studies.id = :id', { id })
        .getOne();
  
  
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


export default StudiesController;