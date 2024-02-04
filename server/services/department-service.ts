import { Request, Response } from 'express';
import database from '../database';

const getDepartmentByCode = async (req: Request, res: Response) => {
  try {
    const departmentCode = req.params.departmentCode;   
    const data = await database.query(`SELECT * FROM departement WHERE departement_code = '${departmentCode}'`);
    const department = data; 
    
    res.status(200).json(department);
  } catch (err) {
    res.status(500).json(err);
  }
}


export { getDepartmentByCode };
