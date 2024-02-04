import { Request, Response } from 'express';
import database from '../database';

const getTownsByDepartment = async (req: Request, res: Response) => {
    try {
      const departmentId = req.params.departmentId;   
      const data = await database.query(
        `SELECT ville_code_postal, ville_departement, ville_nom_reel, ville_population_2012, ville_surface FROM ville 
        WHERE ville_departement = '${departmentId}' ORDER BY ville_nom_reel ASC`);
      const towns = data; 
      
      res.status(200).json(towns);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  export { getTownsByDepartment };