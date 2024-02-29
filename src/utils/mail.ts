import SendMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

const SENDGRIDKEY = process.env.SENDGRID_API_KEY as string;

SendMail.setApiKey(SENDGRIDKEY);

export const forgotPasswordMail = async (
	name: string,
	email: string,
	link: string,
) => {
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
	SendMail.send(msg)
		.then((response) => {
			console.log(response[0].statusCode);
			console.log(response[0].headers);
		})
		.catch((error) => {
			console.error(error);
		});
};
