import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { User } from '../models/user';
import { logger } from '../middlewares/logger';
import { Token } from '../models/token';
import crypto from 'crypto';
import { forgotPasswordMail } from '../utils/mail';

const CLIENT_URL = process.env.CLIENT_URL as string;

export const forgotPassword = async (req: Request, res: Response) => {
	try {
		const { email } = req.body;

		const founder = await User.findOne({ email: email });
		if (!founder) {
			throw new Error('User with email does not exist');
		}

		let token = await Token.findOne({ owner: founder._id });
		if (token) await token.deleteOne();

		const tokenId = await Token.create({
			owner: founder._id,
			token: crypto.randomBytes(8).toString('hex'),
		});
		console.log(tokenId);
		if (!tokenId) {
			throw new Error('invalid token');
		}

		const link = `${CLIENT_URL}/passwordReset?token=${tokenId.token}/`;

		await forgotPasswordMail(founder.name, founder.email, link);
		return res.status(StatusCodes.OK).json({
			success: true,
			message: 'mail has been sent to email',
			data: tokenId,
		});
	} catch (err: any) {
		console.log(err);

		logger.error(err.message);
		const statusMap: Record<string, number> = {
			'User with email does not exist': StatusCodes.NOT_FOUND,
			'Wrong password.': StatusCodes.BAD_REQUEST,
		};

		const statusCode =
			statusMap[err.message] || StatusCodes.INTERNAL_SERVER_ERROR;
		return res.status(statusCode).json({ error: err.message });
	}
};
