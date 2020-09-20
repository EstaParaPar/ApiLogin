import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Machine } from '../entity/Machine';
import { validate } from 'class-validator';

export class MachineController {
  static getAll = async (req: Request, res: Response) => {
    const machineRepository = getRepository(Machine);
    let machines;

    try {
      machines = await machineRepository.find({select: ['id', 'name']});
    } catch (e) {
      res.status(404).json({message: 'Somenthing goes wrong!'});
    }

    if (machines.length > 0) {
      res.send(machines);
    } else {
      res.status(404).json({message: 'Not result'});
    }
  };
}


export default MachineController;
