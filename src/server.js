import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/authRouter.js';
import registerRouter from './routes/registerRouter.js';
import removeTokens from './middlewares/removeTokens.js';

dotenv.config();

const minute = 60000;
const fiveMinutes = minute * 5;

const server = express();
server.use(express.json());
server.use(cors());

server.use(authRouter);
server.use(registerRouter);

setInterval(removeTokens, fiveMinutes);

server.listen(process.env.PORT, () => console.log(
    `Server online na porta ${process.env.PORT}.`
));