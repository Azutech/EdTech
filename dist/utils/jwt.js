"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.createJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
// import { JWT_SECRET } from './config';
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
const createJWT = (payload) => {
    const secret = JWT_SECRET;
    const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '2h' });
    return token;
};
exports.createJWT = createJWT;
const verifyJWT = (token) => {
    try {
        // Verify the JWT token using your secret key
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        // If verification is successful, return the decoded payload
        return decoded;
    }
    catch (error) {
        // Handle token verification errors
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            // Token has expired
            throw new Error('Token has expired');
        }
        else if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            // Token is invalid or malformed
            throw new Error('Invalid token');
        }
        else {
            // Handle other errors
            throw error;
        }
    }
};
exports.verifyJWT = verifyJWT;
