require ('dotenv').config();
const express = require('express');
const app = express();
const router = require('./router');
const port = process.env.APP_PORT;
app.use(router);
app.use(express.json());
app.listen(port, () => console.log(`Example app listening on port ${port}!`));