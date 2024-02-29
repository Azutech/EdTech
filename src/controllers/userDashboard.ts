import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { User } from '../models/user';
import { logger } from '../middlewares/logger';

export const userDashboard = async (req: Request, res: Response) => {
	try {
		const { id } = req.query;
		const user = await User.findOne({ id });
		if (!user) {
			throw new Error('Unable to retrieve data');
		}
		return res
			.status(StatusCodes.OK)

			.json({ msg: 'All services data retrieved', user });
	} catch (err: any) {
		logger.error(err.message);
		const statusMap: Record<string, number> = {
			'Unable to retrieve data': StatusCodes.CONFLICT,
		};

		const statusCode =
			statusMap[err.message] || StatusCodes.INTERNAL_SERVER_ERROR;
		return res.status(statusCode).json({ error: err.message });
	}
};
