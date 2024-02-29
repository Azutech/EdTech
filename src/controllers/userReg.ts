import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { User } from '../models/user';
import { hashPassword } from '../utils/hashpassword';
import { validatePassword } from '../utils/validatePassword';

export const regUser = async (req: Request, res: Response) => {
	try {
		const { name, email, password } = req.body;

		const existingEmail = await User.findOne({ email });
		if (existingEmail) {
			throw new Error('User already exists');
		}

		const validPassword = validatePassword(password);
		if (!validPassword) {
			throw new Error(
				'Password must be at least 8 characters long, with at least 1 uppercase letter, 1 lowercase letter, and 1 symbol',
			);
		}

		const hash = await hashPassword(password);
		const newUser = new User({
			name,
			email,
			password: hash,
		});

		if (!newUser) {
			throw new Error('Unable to create user');
		}
		await newUser.save();

		return res.status(StatusCodes.CREATED).json({
			msg: 'User created successfully',
		});
	} catch (err: any) {
		const statusMap: Record<string, number> = {
			'User already exist': StatusCodes.CONFLICT,
			'Unable to create user': StatusCodes.BAD_REQUEST,
			'Password must be at least 8 characters long, with at least 1 uppercase letter, 1 lowercase letter, and 1 symbol':
				StatusCodes.BAD_REQUEST,
		};

		const statusCode =
			statusMap[err.message] || StatusCodes.INTERNAL_SERVER_ERROR;
		return res.status(statusCode).json({ error: err.message });
	}
};
