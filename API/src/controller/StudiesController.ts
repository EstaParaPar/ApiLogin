import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Studies } from '../entity/Studies';
import { validate } from 'class-validator';
import { Patients } from '../entity/Patients';
import { StudiesType } from '../entity/StudiesType';
import { HealthInsurance } from '../entity/HealthInsurance';
import { Users } from '../entity/Users';


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
    const {study, machine, doctor, name, dni, lastname, newPatient, newHealth, patient, healthinsurance, date, technician} = req.body;
    const studysave = new Studies();
    const patients = new Patients();
    const healthinsurances = new HealthInsurance();
    let newHealthIns = 0;
    let newPatients = 0;
    let newSavePatient;
    let idPatients;
    let newSaveHealth;
    let idHealthInsurance;
    let idTech;

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

    const userRepository = getRepository(Users);
    let tech = await userRepository.findOne({
      select: ['id'],
      where: {
        username: technician
      }
    });
    idTech = tech.id;


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

    studysave.technician = idTech;
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
      return res.status(409).json({message: e});
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
          'doctorData.name', 'doctorData.lastname','doctorData.id',
          'technicianData.name', 'technicianData.lastname', 'technicianData.id',
          'sTypeData.name', 'sTypeData.id',
          'machineData.name','machineData.id',
          'hInsuranceData.name','hInsuranceData.id',
          'patientsData.name', 'patientsData.lastname','patientsData.id',
          'patientsData.dni'
        ])
        .where('studies.id = :id', { id })
        .getOne();


    } catch (e) {
      res.status(404).json({ message: 'Somenthing goes wrong!' });
    }


    res.send(studies);

  };






  static confirmStudy = async (req: Request, res: Response) => {
    let study;
    const { id } = req.params;

    const studiesRepository = getRepository(Studies);
    // Try get user
    try {
      study = await studiesRepository.findOneOrFail(id);

    } catch (e) {
      return res.status(404).json({ message: 'Study not found' });
    }
    // Try to save user
    try {
      study.state = 2;
      await studiesRepository.save(study);
    } catch (e) {
      return res.status(409).json({ message: 'Study already in use' });
    }

    res.status(201).json({ message: 'Study update' });
  };

  static deleteStudy = async (req: Request, res: Response) => {
    let study;
    const { id } = req.params;

    const studiesRepository = getRepository(Studies);
    // Try get user
    try {
      study = await studiesRepository.findOneOrFail(id);

    } catch (e) {
      return res.status(404).json({ message: 'Study not found' });
    }
    // Try to save user
    try {
      study.state = 4;
      await studiesRepository.save(study);
    } catch (e) {
      return res.status(409).json({ message: 'Study already in use' });
    }

    res.status(201).json({ message: 'Study update' });
  };




  static edit = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { study, machine, doctor, name, dni, lastname, newPatient, newHealth, patient, healthinsurance, date, technician } = req.body;
    let studysave;
    const patients = new Patients();
    const healthinsurances = new HealthInsurance();
    let newHealthIns = 0;
    let newPatients = 0;
    let newSavePatient;
    let idPatients;
    let newSaveHealth;
    let idHealthInsurance;
    let idTech;




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

    const userRepository = getRepository(Users);
    let tech = await userRepository.findOne({
      select: ['id'],
      where: {
        username: technician
      }
    });
    idTech = tech.id;


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
    const StudiesRepository = getRepository(Studies);

    studysave = await StudiesRepository.findOneOrFail(id);

    studysave.technician = idTech;
    studysave.doctor = doctor;
    studysave.studieType = study;
    studysave.machine = machine;
    studysave.idPatients = idPatients;

    studysave.currentPrice = studyPrice.price;
    studysave.idHealthInsurance = idHealthInsurance;
    studysave.studyDate = date;


    try {
      await StudiesRepository.save(studysave);

    } catch (e) {
      return res.status(409).json({ message: e });
    }

    // All ok
    res.send(studysave);
  };




}



export default StudiesController;
