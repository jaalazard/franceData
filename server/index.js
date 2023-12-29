require ('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
const router = require('./routes/router');
const port = process.env.APP_PORT;
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));
app.use(router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));