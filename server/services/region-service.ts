import { Request, Response } from 'express';
import database from '../database';

const getRegions = async (req: Request, res: Response) => {
  try {
    const data = await database.query('SELECT * FROM region ORDER BY region_nom ASC');
    const regions = data[0];
    res.status(200).json(regions);
  } catch (err) {
    res.status(500).json(err);
  }
}

const getRegionById = async (req: Request, res: Response) => {
  try {
    const regionId = req.params.regionId;   
    const data = await database.query(`SELECT * FROM region WHERE region_code = '${regionId}'`);
    const region = data[0]; 
    res.status(200).json(region);
  } catch (err) {
    res.status(500).json(err);
  }
}

const getDepartmentsByRegion = async (req: Request, res: Response) => {
  try {
    const regionId = req.params.regionId;
    const data = await database.query(`SELECT * FROM departement WHERE departement_region = '${regionId}' ORDER BY departement_nom ASC`);
    const departments = data[0];
    res.status(200).json(departments);
  } catch (err) {
    res.status(500).json(err);
  }
};

export { getRegions, getRegionById ,getDepartmentsByRegion };
