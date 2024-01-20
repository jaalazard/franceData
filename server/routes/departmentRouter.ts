import express, { Router, Request, Response } from "express";
import { getDepartmentByCode } from "../services/department-service";
import { getTownsByDepartment } from "../services/town-service";

const departmentRouter: Router = express.Router();

departmentRouter.get("/:departmentCode", async (req: Request, res: Response) => {
  try {
    await getDepartmentByCode(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  departmentRouter.get("/:departmentId/towns", async (req: Request, res: Response) => {
    try {
      await getTownsByDepartment(req, res);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

export default departmentRouter;
