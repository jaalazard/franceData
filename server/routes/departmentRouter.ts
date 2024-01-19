import express, { Router, Request, Response } from "express";
import { getDepartmentById } from "../services/department-service";

const departmentRouter: Router = express.Router();

departmentRouter.get("/:departmentId", async (req: Request, res: Response) => {
  try {
    await getDepartmentById(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

export default departmentRouter;
