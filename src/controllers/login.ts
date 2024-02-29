import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { User } from '../models/user';
import { comparePasswords } from '../utils/hashpassword';
import { logger } from '../middlewares/logger';
import { createJWT } from '../utils/jwt';

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email: email });
		if (!user) {
			throw new Error('User with email does not exist');
		}

		const passwordMatch = await comparePasswords(password, user.password);
		if (!passwordMatch) {
			return res.status(401).json({ message: 'Wrong password' });
		}

		const accessToken = createJWT({ user });
		res.cookie('accessToken', accessToken, {
			httpOnly: true,
			secure: true,
		});

		return res.status(StatusCodes.OK).json({
			email: user.email,
			token: accessToken,
		});
	} catch (err: any) {
		logger.error(err.message);
		const statusMap: Record<string, number> = {
			'User with email does not exist': StatusCodes.NOT_FOUND,
			'Wrong password.': StatusCodes.BAD_REQUEST,
			'User is not active': StatusCodes.BAD_REQUEST,
		};

		const statusCode =
			statusMap[err.message] || StatusCodes.INTERNAL_SERVER_ERROR;
		return res.status(statusCode).json({ error: err.message });
	}
};
