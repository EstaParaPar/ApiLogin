import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Prices } from '../entity/Prices';
import {StudiesType} from "../entity/StudiesType";
import {validate} from "class-validator";



export class PriceController {


  static getById = async (req: Request, res: Response) => {
    const {id} = req.params;
    const PricesRepository = getRepository(Prices);
    try {
      const prices=  await getRepository(Prices)
        .createQueryBuilder('prices')
        .innerJoinAndSelect('prices.studyType', 'studyType')
        .select(['prices',
          'studyType.name'
        ])
        .where('prices.groupPrice = :id', { id })
        .getMany();



      res.send(prices);
    } catch (e) {
      res.status(404).json({message: 'Not result'});
    }
  };




}
export default PriceController;
