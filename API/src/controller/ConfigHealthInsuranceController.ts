import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { HealthInsurance } from '../entity/HealthInsurance';
import { validate } from 'class-validator';
import { GroupPrices } from '../entity/GroupPrices';


export class ConfigHealthInsuranceController {

  static setAll = async (req: Request, res: Response) => {
    const gpData = ["PAMI","OTROS","ISSN","CARNET","PARTICULAR"];
    const healthData = [
      //["PAMI", 7],
     // ["AVALIAN (ACA SALUD)",9],
      //["APSOT / TECHINT",9],
      ["CLINICA DEL VALLE - CONSOLIDAR",9],
      ["GALENO ARGENTINA S.A.",9],
      ["GERDANNA S.A.",9],
      ["INTEGRIDAD SALUD (SER SALUD)",9],
      ["ITER MEDICINA (OSAM-OSDOP-OSPACA)",9],
      ["MEDICUS",9],
      ["MEDIFE",9],
      ["MEDLINK SA // UP-Accord Salud",9],
      ["MUTUAL FEDERADA",9],
      ["O.S.D.I.P.P.",9],
      ["O.S.P.I.D.A.",9],
      ["OSDE",9],
      ["OSFATLYF",9],
      ["OSPATCA",9],
      ["OSPEPRI",9],
      ["O.S.P. I. MADERA",9],
      ["OSSEG",9],
      ["PODER JUDICIAL",9],
      ["POLICIA FEDERAL",9],
      ["S.O.S.U.N.C.",9],
      ["SANCOR SALUD",9],
      ["SCIS S.A.",9],
      ["S.P.F. (Serv. Penitenciario Federal)",9],
      ["SWISS MEDICAL S.A.",9],
      ["UOM",9],
      ["BANCARIOS",9],
      ["CAJA FORENSE",9],
      ["CERAMISTAS",9],
      ["ISSN", 8],
      ["JERARQUICOS SALUD S.A.",9],
      ["OSMATA",9],
      ["O.S.A.P.M.",9],
      ["O.S.P.I.L.",9],
      ["OMINT",9],
      ["PASTELEROS Y CONFITEROS",9],
      ["PREVENCION SALUD",9],
      ["GILSA S.A. (INTEGRAL SALUD)",9],
      ["PARTICULAR", 11],
      ["CARNET", 10]]
    try {
      for (var i = 0; i < healthData.length; i++) {
        console.log(healthData[i][0]);
        console.log(healthData[i][1]);
        let healthInsurance = new HealthInsurance();
        let name = ""+healthData[i][0];
        healthInsurance.name = name;

        const groupPriceRepository = getRepository(GroupPrices);
        const healthInsuranceRepository = getRepository(HealthInsurance);


          const groupPrice = await groupPriceRepository.findOneOrFail(healthData[i][1]);
          healthInsurance.groupPrice = groupPrice;
          await healthInsuranceRepository.save(healthInsurance);











     }

    } catch (e) {
      return res.status(409).json({ message: 'Prepaga/O.social  already exist' });
    }
    // All ok
    res.send('Prepaga/O.social created');
  }


}



export default ConfigHealthInsuranceController;
