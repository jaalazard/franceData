import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes/router';
dotenv.config();
const app = express();
const port = process.env.APP_PORT;
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(router);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
