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
exports.userDashboard = void 0;
const http_status_codes_1 = require("http-status-codes");
const user_1 = require("../models/user");
const logger_1 = require("../middlewares/logger");
const userDashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const user = yield user_1.User.findOne({ id });
        if (!user) {
            throw new Error('Unable to retrieve data');
        }
        return res
            .status(http_status_codes_1.StatusCodes.OK)
            .json({ msg: 'All services data retrieved', user });
    }
    catch (err) {
        logger_1.logger.error(err.message);
        const statusMap = {
            'Unable to retrieve data': http_status_codes_1.StatusCodes.CONFLICT,
        };
        const statusCode = statusMap[err.message] || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        return res.status(statusCode).json({ error: err.message });
    }
});
exports.userDashboard = userDashboard;
