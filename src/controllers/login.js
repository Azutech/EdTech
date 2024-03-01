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
exports.login = void 0;
const http_status_codes_1 = require("http-status-codes");
const user_1 = require("../models/user");
const hashpassword_1 = require("../utils/hashpassword");
const logger_1 = require("../middlewares/logger");
const jwt_1 = require("../utils/jwt");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_1.User.findOne({ email: email });
        if (!user) {
            throw new Error('User with email does not exist');
        }
        const passwordMatch = yield (0, hashpassword_1.comparePasswords)(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Wrong password' });
        }
        const accessToken = (0, jwt_1.createJWT)({ user });
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
        });
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            email: user.email,
            token: accessToken,
        });
    }
    catch (err) {
        logger_1.logger.error(err.message);
        const statusMap = {
            'User with email does not exist': http_status_codes_1.StatusCodes.NOT_FOUND,
            'Wrong password.': http_status_codes_1.StatusCodes.BAD_REQUEST,
            'User is not active': http_status_codes_1.StatusCodes.BAD_REQUEST,
        };
        const statusCode = statusMap[err.message] || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        return res.status(statusCode).json({ error: err.message });
    }
});
exports.login = login;
