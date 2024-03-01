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
exports.resetpasswordService = void 0;
const http_status_codes_1 = require("http-status-codes");
const user_1 = require("../models/user");
const logger_1 = require("../middlewares/logger");
const token_1 = require("../models/token");
const hashpassword_1 = require("../utils/hashpassword");
const resetpasswordService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, } = req.query;
        const { password } = req.body;
        const user = yield user_1.User.findById(req.params.query);
        if (!user) {
            throw new Error('User not found');
        }
        const checktoken = yield token_1.Token.findOne({
            token: req.params.token
        });
        if (!checktoken) {
            throw new Error('invalid code or expired');
        }
        const hash = yield (0, hashpassword_1.hashPassword)(password);
        yield user_1.User.updateOne({ _id: user._id }, { $set: { password: hash } }, { new: true });
        yield user.save();
        yield checktoken.deleteOne();
        res.status(http_status_codes_1.StatusCodes.OK).json({
            msg: 'Password updated succesfully'
        });
    }
    catch (err) {
        logger_1.logger.error(err.message);
        const statusMap = {
            'User not found': http_status_codes_1.StatusCodes.CONFLICT,
            'invalid code or expired': http_status_codes_1.StatusCodes.CONFLICT,
        };
        const statusCode = statusMap[err.message] || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        return res.status(statusCode).json({ error: err.message });
    }
});
exports.resetpasswordService = resetpasswordService;
