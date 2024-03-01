"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const mongoose_1 = require("mongoose");
const user_1 = require("./user");
const tokenSchema = new mongoose_1.Schema({
    owner: {
        type: String,
        required: true,
        ref: user_1.User,
    },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now(), expires: 3600 },
}, 
// { _id: false },
{ timestamps: true });
exports.Token = (0, mongoose_1.model)('Token', tokenSchema);
