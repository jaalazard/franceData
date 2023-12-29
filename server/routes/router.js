const express = require('express');
const authRouter = require('./authRouter');
const router = express.Router();
const townHandlers = require('../handlers/townHandlers');

router.get('/', (req, res) => {
    res.send('Hello world!');
    });

router.get('/towns', townHandlers.getTenTowns);

router.use('/auth', authRouter);

module.exports = router;