import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/authRouter.js';
import registerRouter from './routes/registerRouter.js';

dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());

server.use(authRouter);
server.use(registerRouter);

server.listen(process.env.PORT, () => console.log(
    `Server online na porta ${process.env.PORT}.`
));