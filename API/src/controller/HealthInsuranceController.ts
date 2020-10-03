import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { HealthInsurance } from '../entity/HealthInsurance';
import { validate } from 'class-validator';


export class HealthInsuranceController {


  static getAll = async (req: Request, res: Response) => {
    const HealthInsuranceRepository = getRepository(HealthInsurance);
    let healthInsurance;

    try {
      healthInsurance = await HealthInsuranceRepository.find({select: ['id', 'name']});
    } catch (e) {
      res.status(404).json({message: 'Somenthing goes wrong!'});
    }

    if (healthInsurance.length > 0) {
      res.send(healthInsurance);
    } else {
      res.status(404).json({message: 'Not resultsss'});
    }
  }

  static new = async (req: Request, res: Response) => {
    const { name } = req.body;
    const healthInsurance = new HealthInsurance();

    healthInsurance.name = name;


    // Validate
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(healthInsurance, validationOpt);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }



    const healthInsuranceRepository = getRepository(HealthInsurance);
    try {
      await healthInsuranceRepository.save(healthInsurance);
    } catch (e) {
      return res.status(409).json({ message: 'Prepaga/O.social  already exist' });
    }
    // All ok
    res.send('Prepaga/O.social created');
  };
}


export default HealthInsuranceController;
