import express from 'express';
import authRouter from './authRouter';
const router = express.Router();
const townHandlers = require('../handlers/townHandlers');
router.get('/', (req, res) => {
    res.send('Hello world!');
});
router.get('/towns', townHandlers.getTenTowns);
router.use('/auth', authRouter);
export default router;
