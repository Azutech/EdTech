import { Schema, model } from 'mongoose';

import { UserTypes } from '../utils/types';

const userSchema = new Schema<UserTypes>({
	name: {
		type: String,
	},
	email: {
		type: String,
		required: [false, 'Please provide your email'],
		unique: true,
		trim: true,
		validate: {
			validator: function (value: string) {
				// Custom email validation logic using a regular expression
				const emailRegex =
					/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.(com|org|net|gov|co\.uk)$/i;
				return emailRegex.test(value);
			},
			message: 'provide a correct email domain',
		},
	},
	password: {
		type: String,
	},

	token: {
		type: String,
	},
});

export const User = model('User', userSchema);
