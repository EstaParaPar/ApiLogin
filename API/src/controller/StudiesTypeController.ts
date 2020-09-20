import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { StudiesType } from '../entity/StudiesType';
import { validate } from 'class-validator';

export class StudiesTypeController{
  static getAll = async (req: Request, res: Response) => {
    const studiesRepository = getRepository(StudiesType);
    let studies;

    try {
      studies = await studiesRepository.find({select: ['id', 'name', 'price']});
    } catch (e) {
      res.status(404).json({message: 'Somenthing goes wrong!'});
    }

    if (studies.length > 0) {
      res.send(studies);
    } else {
      res.status(404).json({message: 'Not result'});
    }
  }
}


export default StudiesTypeController;
