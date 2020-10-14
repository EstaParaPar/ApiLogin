import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Studies } from '../entity/Studies';
import { validate } from 'class-validator';
import { Patients } from '../entity/Patients';
import { PayOut } from '../entity/PayOut';
import { HealthInsurance } from '../entity/HealthInsurance';
import { Users } from '../entity/Users';


export class PayoutController {

    static new = async (req: Request, res: Response) => {
        console.log(req.body);
        const {studyId, totalPrice} = req.body;
        const payoutsave = new PayOut();

        let idStudy;
        let doctorId;
        let idTech;
        
        const StudiesRepository = getRepository(Studies)
        let studie = await StudiesRepository.findOne({
          select: ['id', 'doctor','technician','state'],
          where: {
            id: studyId
          }
        });
        idStudy = studie.id;
        doctorId = studie.doctor;
        idTech = studie.technician;
        studie.state = 3;

  

        payoutsave.technician = idTech;
        payoutsave.doctor = doctorId;
        payoutsave.totalPrice = totalPrice;


        const PayoutRepository = getRepository(PayOut);
        try {
          await PayoutRepository.save(payoutsave);  
          console.log(payoutsave); 
        } catch (e) {
          return res.status(409).json({message: e});
        }
    
        // All ok
        res.send(payoutsave);
      };


}

export default PayoutController;
