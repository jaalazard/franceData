import express, { Router, Response } from 'express';
import authRouter from './authRouter';

const router: Router = express.Router();
const townHandlers = require('../handlers/townHandlers');

router.get('/', (res: Response) => {
  res.send('Hello world!');
});

router.get('/towns', townHandlers.getTenTowns);

router.use('/auth', authRouter);

export default router;
