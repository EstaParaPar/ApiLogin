import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Patients } from '../entity/Patients';
import { validate } from 'class-validator';


export class PatientsController {


  static getAll = async (req: Request, res: Response) => {
    const PatientsRepository = getRepository(Patients);
    let patients;

    try {
      patients = await PatientsRepository.find({select: ['id', 'name','lastname','dni']});
    } catch (e) {
      res.status(404).json({message: 'Somenthing goes wrong!'});
    }

    if (patients.length > 0) {
      res.send(patients);
    } else {
      res.status(404).json({message: 'Not resultsss'});
    }
  }

  static new = async (req: Request, res: Response) => {
    const { name, lastname, dni } = req.body;
    const patient = new Patients();

    patient.name = name;
    patient.lastname = lastname;
    patient.dni = dni;


    // Validate
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(patient, validationOpt);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }



    const PatientsRepository = getRepository(Patients);
    try {
      await PatientsRepository.save(patient);
    } catch (e) {
      return res.status(409).json({ message: 'paciente already exist' });
    }
    // All ok
    res.send('Patient created');
  };
}


export default PatientsController;
