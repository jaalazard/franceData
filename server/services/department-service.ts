import { Request, Response } from 'express';
import database from '../database';

const getDepartmentById = async (req: Request, res: Response) => {
  try {
    const departmentId = req.params.departmentId;   
    const data = await database.query(`SELECT * FROM departement WHERE departement_id = '${departmentId}'`);
    const department = data; 
    
    res.status(200).json(department);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}


export { getDepartmentById };
