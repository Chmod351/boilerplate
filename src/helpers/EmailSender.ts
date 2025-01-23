import * as nodemailer from 'nodemailer';

export interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  text: string;
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
			from: options.from,
			to: options.to,
			subject: options.subject,
			text: options.text,
			html: options.html,
		};

		await this.transporter.sendMail(mailOptions);
	}
}

export default EmailSender;
