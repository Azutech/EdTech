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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPassword = void 0;
const http_status_codes_1 = require("http-status-codes");
const user_1 = require("../models/user");
const logger_1 = require("../middlewares/logger");
const token_1 = require("../models/token");
const crypto_1 = __importDefault(require("crypto"));
const mail_1 = require("../utils/mail");
const CLIENT_URL = process.env.CLIENT_URL;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const founder = yield user_1.User.findOne({ email: email });
        if (!founder) {
            throw new Error('User with email does not exist');
        }
        let token = yield token_1.Token.findOne({ owner: founder._id });
        if (token)
            yield token.deleteOne();
        const tokenId = yield token_1.Token.create({
            owner: founder._id,
            token: crypto_1.default.randomBytes(8).toString('hex'),
        });
        console.log(tokenId);
        if (!tokenId) {
            throw new Error('invalid token');
        }
        const link = `${CLIENT_URL}/passwordReset?token=${tokenId.token}/`;
        yield (0, mail_1.forgotPasswordMail)(founder.name, founder.email, link);
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: 'mail has been sent to email',
            data: tokenId,
        });
    }
    catch (err) {
        console.log(err);
        logger_1.logger.error(err.message);
        const statusMap = {
            'User with email does not exist': http_status_codes_1.StatusCodes.NOT_FOUND,
            'Wrong password.': http_status_codes_1.StatusCodes.BAD_REQUEST,
        };
        const statusCode = statusMap[err.message] || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        return res.status(statusCode).json({ error: err.message });
    }
});
exports.forgotPassword = forgotPassword;
