import { Request, Response } from 'express';
import database from '../database';

const getDepartmentsByRegion = async (req: Request, res: Response) => {
  try {
    const regionId = req.params.regionId;
    console.log(regionId);
    
    const data = await database.query(`SELECT departement_nom FROM departement WHERE departement_region = '${regionId}' ORDER BY departement_nom ASC`);
    const departments = data[0];
    res.status(200).json(departments);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export { getDepartmentsByRegion };
