import express, { Application, Request, Response } from 'express';
import { config } from 'dotenv';
import { StatusCodes } from 'http-status-codes';
import {database} from '../src/connection/database';
import { logger } from './middlewares/logger';


config();


import { PORT } from '../src/utils/config';
import { routes } from './routes';

database().catch((err) => console.error(err));


export const server: Application = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use('/api/v1', routes);

server.get('/', (req: Request, res: Response) => {
	res.status(StatusCodes.OK).json({
		message: 'Welcome To Consonance Server 🚀🚀',
	});
});

server.get('*', (req: Request, res: Response) => {
	res.status(StatusCodes.NOT_FOUND).json({ message: 'route not found 🔎' });
});

server.listen(PORT, () => {
    return logger.info(`Express is listening at http://localhost:${PORT}`);
  });
