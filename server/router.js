const express = require('express');
const router = express.Router();
const townHandlers = require('./handlers/townHandlers');

router.get('/', (req, res) => {
    res.send('Hello world!');
    });

router.get('/towns', townHandlers.getTenTowns);

module.exports = router;