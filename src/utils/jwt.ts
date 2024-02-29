import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// import { JWT_SECRET } from './config';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const createJWT = (payload: object) => {
	const secret = JWT_SECRET;
	const token = jwt.sign(payload, secret, { expiresIn: '2h' });
	return token;
};

export const verifyJWT = (token: string): any => {
	try {
		// Verify the JWT token using your secret key
		const decoded = jwt.verify(token, JWT_SECRET);

		// If verification is successful, return the decoded payload
		return decoded;
	} catch (error) {
		// Handle token verification errors
		if (error instanceof jwt.TokenExpiredError) {
			// Token has expired
			throw new Error('Token has expired');
		} else if (error instanceof jwt.JsonWebTokenError) {
			// Token is invalid or malformed
			throw new Error('Invalid token');
		} else {
			// Handle other errors
			throw error;
		}
	}
};
