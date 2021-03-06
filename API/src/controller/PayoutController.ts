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
        const {studyId,payoutPriceTech, payoutPrice, payoutTechId, payoutDoctorId} = req.body;
        const payoutsave = new PayOut();

        let idStudy = studyId;
        let doctorId = payoutDoctorId;
        let idTech = payoutTechId;
        let Total = payoutPrice;
        let totalTech = payoutPriceTech;
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
        payoutsave.totalPriceTech = totalTech;


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

  static getListPayoutByDoctor = async (req: Request, res: Response) => {
    console.log(req.params);
    const { id } = req.params;
    let payout;
    try {
      payout = await getRepository(PayOut)
        .createQueryBuilder('payout')
        .innerJoinAndSelect('payout.doctor', 'doctorData')
        .innerJoinAndSelect('payout.technician', 'technicianData')
        .select(['payout',
          'doctorData.name', 'doctorData.lastname','doctorData.lastname',
          'payout.createAT',
          'technicianData.name', 'technicianData.lastname','technicianData.id',
          'payout.totalPrice'
        ])
        .where('payout.doctor = :id', { id })
        .getMany();
      
      
    } catch (e) {
      res.status(404).json({ message: 'Somenthing goes wrong!' });
    }
            
    res.send(payout);
    
          
  };

  static getDetailPayout = async (req: Request, res: Response) => {
    console.log(req.params);
    const { id } = req.params;
    let payout;
    let studies;
    let healthIns;
    let detailPayOut =new Array();

    try {
      healthIns = await getRepository(HealthInsurance)
        .createQueryBuilder('HI')
        .select(['HI'])
        .getMany();



      payout = await getRepository(PayOut)
        .createQueryBuilder('payout')
        .innerJoinAndSelect('payout.doctor', 'doctorData')
        .innerJoinAndSelect('payout.technician', 'technicianData')
        .select(['payout',
          'doctorData.name', 'doctorData.lastname','doctorData.id',
          'technicianData.name', 'technicianData.lastname','technicianData.id',
          'payout.totalPrice'
        ])
        .where('payout.id = :id', { id })
        .getOne();

      for (let i=0; i<healthIns.length; i++){
        let idHealthIns = healthIns[i].id;
        console.log("-----------------------------------");
        console.log(healthIns[i].name);
        console.log(idHealthIns);
        console.log(id);

        let studies_health = await getRepository(Studies)
          .createQueryBuilder('studies')
          .innerJoinAndSelect('studies.doctor', 'doctorData')
          .innerJoinAndSelect('studies.technician', 'technicianData')
          .innerJoinAndSelect('studies.studieType', 'sTypeData')
          .innerJoinAndSelect('studies.machine', 'machineData')
          .innerJoinAndSelect('studies.idHealthInsurance', 'hInsuranceData')
          .innerJoinAndSelect('studies.idPatients', 'patientsData')
          .select(['studies',
            'doctorData.name','doctorData.lastname',
            'technicianData.name','technicianData.lastname',
            'sTypeData.name','sTypeData.id',
            'machineData.name',
            'hInsuranceData.name',
            'patientsData.name', 'patientsData.lastname',
            'patientsData.dni'
          ])
          .where('studies.payOutId = :id', { id })
          .andWhere('studies.idHealthInsuranceId = :idHealthIns', { idHealthIns })
          .getMany();


       console.log(studies_health);
        let monto_os = 0;
        let monto_os_tech = 0;
        if (studies_health.length)
        {
          for (let j=0; j<studies_health.length; j++){
            monto_os = monto_os + studies_health[j].currentPrice;
            monto_os_tech = monto_os_tech + studies_health[j].techCurrentPrice;

          }
        }



        let oneHealthIns ={
          obraSocial : healthIns[i],
          studies : studies_health,
          precio_os: monto_os,
          precio_tech: monto_os_tech
        };


        detailPayOut.push(oneHealthIns);
      }

      console.log(detailPayOut);




      res.send({ payout, detailPayOut});


    } catch (e) {
      res.status(404).json({ message: 'Somenthing goes wrong!' });
    }



  };

  static getListPayoutByTech = async (req: Request, res: Response) => {
    console.log(req.params);
    const { id } = req.params;
    let payout;
    try {
      payout = await getRepository(PayOut)
        .createQueryBuilder('payout')
        .innerJoinAndSelect('payout.doctor', 'doctorData')
        .innerJoinAndSelect('payout.technician', 'technicianData')
        .select(['payout',
          'doctorData.name', 'doctorData.lastname','doctorData.lastname',
          'payout.createAT',
          'technicianData.name', 'technicianData.lastname','technicianData.id',
          'payout.totalPrice'
        ])
        .where('payout.technician = :id', { id })
        .getMany();


    } catch (e) {
      res.status(404).json({ message: 'Somenthing goes wrong!' });
    }

    res.send(payout);


  };


} 



export default PayoutController;
