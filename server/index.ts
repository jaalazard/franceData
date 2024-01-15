import dotenv from 'dotenv'; 
import path from 'path';

const envPath = path.resolve(__dirname, '.env');
dotenv.config({ path: envPath });
import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes/router';

const app: Application = express();
const port = process.env.APP_PORT;

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
