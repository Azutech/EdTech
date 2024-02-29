import mongoose, { model, Schema } from 'mongoose';
import { TokenType } from '../utils/types';
import { User } from './user';

const tokenSchema = new Schema<TokenType>(
	{
		owner: {
			type: String,
			required: true,
			ref: User,
		},
		token: { type: String, required: true },
		createdAt: { type: Date, default: Date.now(), expires: 3600 },
	},

	// { _id: false },

	{ timestamps: true },
);
export const Token = model('Token', tokenSchema);
