import * as nodemailer from 'nodemailer';
import  environment  from '../helpers/envConfig';

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

class EmailSender {
	private transporter: nodemailer.Transporter;

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: 'smtp.example.com',
			port: 587,
			secure: false, // or 'STARTTLS'
			auth: {
				user: 'username',
				pass: 'password',
			},
		});
	}

	async sendEmail(options: EmailOptions): Promise<void> {
		const mailOptions = {
			from: environment.EMAIL_SENDER,
			to: options.to,
			subject: options.subject,
			html: options.html,
		};

		await this.transporter.sendMail(mailOptions);
	}
}

export default EmailSender;
