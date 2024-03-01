"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: [false, 'Please provide your email'],
        unique: true,
        trim: true,
        validate: {
            validator: function (value) {
                // Custom email validation logic using a regular expression
                const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.(com|org|net|gov|co\.uk)$/i;
                return emailRegex.test(value);
            },
            message: 'provide a correct email domain',
        },
    },
    password: {
        type: String,
    },
    token: {
        type: String,
    },
});
exports.User = (0, mongoose_1.model)('User', userSchema);
