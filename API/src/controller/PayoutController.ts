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
        const {studyId, payoutPrice, payoutTechId, payoutDoctorId} = req.body;
        const payoutsave = new PayOut();

        let idStudy = studyId;
        let doctorId = payoutDoctorId;
        let idTech = payoutTechId;
        let Total = payoutPrice;
        
/*const StudiesRepository = getRepository(Studies)
        let studie = await StudiesRepository.findOne({
          select: ['id'],
          where: {
            id: studyId
          }
        });*/


  

        payoutsave.technician = idTech;
        payoutsave.doctor = doctorId;
        payoutsave.totalPrice = Total;


        const PayoutRepository = getRepository(PayOut);
        try {
          let study
          await PayoutRepository.save(payoutsave);  
          const StudiesRepository = getRepository(Studies);
          console.log(payoutsave); 
          let payoutId = payoutsave.id;
          for (var x= 0 ; x< idStudy.length; x++){
            study = await StudiesRepository.findOneOrFail(idStudy[x]);
            study.payOut= payoutId;
            study.state = 3;
          await StudiesRepository.save(study);
          }
        } catch (e) {
          return res.status(409).json({message: e});
        }
    
        // All ok
        res.send(payoutsave);
      };


}

export default PayoutController;
