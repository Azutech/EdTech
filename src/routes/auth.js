"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const express_1 = require("express");
const index_1 = require("../controllers/index");
exports.user = (0, express_1.Router)();
exports.user.post('/register', index_1.regUser);
exports.user.post('/login', index_1.login);
exports.user.get('/me', index_1.userDashboard);
exports.user.post('/forgotPassword', index_1.forgotPassword);
exports.user.post('/resetpasswordService', index_1.resetpasswordService);
