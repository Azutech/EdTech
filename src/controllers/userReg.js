"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.regUser = void 0;
const http_status_codes_1 = require("http-status-codes");
const user_1 = require("../models/user");
const hashpassword_1 = require("../utils/hashpassword");
const validatePassword_1 = require("../utils/validatePassword");
const regUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const existingEmail = yield user_1.User.findOne({ email });
        if (existingEmail) {
            throw new Error('User already exists');
        }
        const validPassword = (0, validatePassword_1.validatePassword)(password);
        if (!validPassword) {
            throw new Error('Password must be at least 8 characters long, with at least 1 uppercase letter, 1 lowercase letter, and 1 symbol');
        }
        const hash = yield (0, hashpassword_1.hashPassword)(password);
        const newUser = new user_1.User({
            name,
            email,
            password: hash,
        });
        if (!newUser) {
            throw new Error('Unable to create user');
        }
        yield newUser.save();
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({
            msg: 'User created successfully',
        });
    }
    catch (err) {
        const statusMap = {
            'User already exist': http_status_codes_1.StatusCodes.CONFLICT,
            'Unable to create user': http_status_codes_1.StatusCodes.BAD_REQUEST,
            'Password must be at least 8 characters long, with at least 1 uppercase letter, 1 lowercase letter, and 1 symbol': http_status_codes_1.StatusCodes.BAD_REQUEST,
        };
        const statusCode = statusMap[err.message] || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        return res.status(statusCode).json({ error: err.message });
    }
});
exports.regUser = regUser;
