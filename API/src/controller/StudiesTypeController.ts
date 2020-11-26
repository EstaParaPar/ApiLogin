import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { StudiesType } from '../entity/StudiesType';
import {validate} from "class-validator";
import { GroupPrices } from '../entity/GroupPrices';
import { Prices } from '../entity/Prices';

export class StudiesTypeController {
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
  static new = async (req: Request, res: Response) => {
    const { name } = req.body;
    const studiesType = new StudiesType();
    
      studiesType.name = name;
      studiesType.price = 0;

    // Validate
    const errors = await validate(studiesType);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    const studiesRepository = getRepository(StudiesType);
    try {

      await studiesRepository.save(studiesType);

      const groupPricesRepository = getRepository(GroupPrices);
      let groupPrices = await groupPricesRepository
      .find({ select: ['id', 'name'] });
      const pricesRepository = getRepository(Prices);
      for (let i = 0; i < groupPrices.length; i++) {
        const price = new Prices();
        price.groupPrice = groupPrices[i];
        price.studyType = studiesType;
        price.techPrice = 0;
        price.totalPrice = 0;

        await pricesRepository.save(price);
      }

    } catch (e) {
      return res.status(409).json({message: "No se pudo cargar tipo de estudio"});
    }
    // All ok
    res.send(studiesType);
  };


  static getById = async (req: Request, res: Response) => {
    const {id} = req.params;
    const studiesRepository = getRepository(StudiesType);
    try {
      const studiesType = await studiesRepository.findOneOrFail(id);
      res.send(studiesType);
    } catch (e) {
      res.status(404).json({message: 'Not result'});
    }
  };


  static edit = async (req: Request, res: Response) => {
    let study;
    const { id } = req.params;
    const { name, price } = req.body;

    const studiesRepository = getRepository(StudiesType);
    // Try get user
    try {
      study = await studiesRepository.findOneOrFail(id);
      study.name = name;
      study.price = price;
    } catch (e) {
      return res.status(404).json({ message: 'Study not found' });
    }
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(study, validationOpt);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // Try to save user
    try {
      await studiesRepository.save(study);
    } catch (e) {
      return res.status(409).json({ message: 'Study already in use' });
    }

    res.status(201).json({ message: 'Study update' });
  };

}
export default StudiesTypeController;
