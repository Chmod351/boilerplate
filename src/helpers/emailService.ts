import EmailSender, {EmailOptions} from './EmailSender';

interface IEmailService {
  sendEmail(options: EmailOptions): Promise<void>;
}



class EmailService implements IEmailService {
	private emailSender: EmailSender;

	constructor() {
		this.emailSender = new EmailSender();
	}

	async sendEmail(options: EmailOptions): Promise<void> {
		await this.emailSender.sendEmail(options);
	}
}

export default EmailService;
