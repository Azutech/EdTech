export interface UserTypes {
	name: string;
	email: string;
	password: string;
	token: string;
}

export interface TokenType {
	owner: string;
	token: string;
	createdAt: Date;
}
