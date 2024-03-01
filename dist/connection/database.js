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
exports.database = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = require("../middlewares/logger");
dotenv_1.default.config();
mongoose_1.default.set('debug', false);
const uri = process.env.DATABASE_URI;
const database = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default
        .connect(uri)
        .then(() => {
        logger_1.logger.info(`Connected to Bob's Database`);
    })
        .catch((err) => {
        logger_1.logger.error(`Error connecting to the database. n${err}`);
        process.exit(1);
    });
});
exports.database = database;
