import {Column, getRepository, JoinColumn, ManyToOne} from 'typeorm';
import { Request, Response } from 'express';
import { GroupPrices } from '../entity/GroupPrices';
import {validate} from "class-validator";
import {StudiesType} from "../entity/StudiesType";
import { Prices } from '../entity/Prices';


export class GroupPriceController {
  static getAll = async (req: Request, res: Response) => {
    const GroupPricesRepository = getRepository(GroupPrices);
    let studies;

    try {
      studies = await GroupPricesRepository.find({select: ['id', 'name']});
    } catch (e) {
      res.status(404).json({message: 'Somenthing goes wrong!'});
    }

    if (studies.length > 0) {
      res.send(studies);
    } else {
      res.status(404).json({message: 'Not result'});
    }
  }


  static getById = async (req: Request, res: Response) => {
    const {id} = req.params;
    const GroupPricesRepository = getRepository(GroupPrices);
    try {
      const groupPrice = await GroupPricesRepository.findOneOrFail(id);
      res.send(groupPrice);
    } catch (e) {
      res.status(404).json({message: 'Not result'});
    }
  };

  static new = async (req: Request, res: Response) => {
    const { name } = req.body;
    const groupPrice = new GroupPrices();

    groupPrice.name = name;


    // Validate
    const errors = await validate(groupPrice);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    const GroupPricesRepository = getRepository(GroupPrices);
    try {

      await GroupPricesRepository.save(groupPrice);

      const studieTypeRepository = getRepository(StudiesType);
      let studiesTypes = await studieTypeRepository.find({select: ['id', 'name']});
      const pricesRepository = getRepository(Prices);
      for (let i=0; i<= studiesTypes.length; i++  )
      {
        const price = new Prices();
        price.studyTypeId = studiesTypes[i];
        price.groupPrice = groupPrice;
        price.techPrice =0;
        price.totalPrice =0;

        await pricesRepository.save(price);
      }


    } catch (e) {
      return res.status(409).json({message: e});
    }
    // All ok
    res.send(groupPrice);
  };



}
export default GroupPriceController;
