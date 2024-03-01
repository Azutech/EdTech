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
exports.forgotPasswordMail = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SENDGRIDKEY = process.env.SENDGRID_API_KEY;
mail_1.default.setApiKey(SENDGRIDKEY);
const forgotPasswordMail = (name, email, link) => __awaiter(void 0, void 0, void 0, function* () {
    const msg = {
        to: email,
        from: 'azunna.onugha@outlook.com',
        subject: 'Password Reset Request',
        text: 'Password reset',
        html: `<h2> Hello ${name} </h2> 
      
            <p>You requested to reset your password</p>
   
             <p>Fill in the link: <strong>${link}</strong></p>
              
              <p>This code will expire within 60 minutes.</p>
             
              <p>If you don't want to reset your credentials, just ignore this message and nothing will be changed.`,
    };
    mail_1.default.send(msg)
        .then((response) => {
        console.log(response[0].statusCode);
        console.log(response[0].headers);
    })
        .catch((error) => {
        console.error(error);
    });
});
exports.forgotPasswordMail = forgotPasswordMail;
