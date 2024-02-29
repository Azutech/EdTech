import bcrypt from 'bcrypt';

// Function to hash a password
export async function hashPassword(password: string) {
	try {
		const saltRounds: number = 10;
		const hash = await bcrypt.hash(password, saltRounds);
		return hash;
	} catch (err: any) {
		console.log(err);
	}
}

// Function to compare a password with its hash
export async function comparePasswords(
	password: string,
	hashedPassword: string,
): Promise<boolean> {
	return bcrypt.compare(password, hashedPassword);
}
