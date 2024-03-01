"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const http_status_codes_1 = require("http-status-codes");
const database_1 = require("../src/connection/database");
const logger_1 = require("./middlewares/logger");
(0, dotenv_1.config)();
const config_1 = require("../src/utils/config");
const routes_1 = require("./routes");
(0, database_1.database)().catch((err) => console.error(err));
exports.server = (0, express_1.default)();
exports.server.use(express_1.default.json());
exports.server.use(express_1.default.urlencoded({ extended: true }));
exports.server.use('/api/v1', routes_1.routes);
exports.server.get('/', (req, res) => {
    res.status(http_status_codes_1.StatusCodes.OK).json({
        message: `Welcome To Bob's Server 🚀🚀`,
    });
});
exports.server.get('*', (req, res) => {
    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: 'route not found 🔎' });
});
exports.server.listen(config_1.PORT, () => {
    return logger_1.logger.info(`Express is listening at http://localhost:${config_1.PORT}`);
});
