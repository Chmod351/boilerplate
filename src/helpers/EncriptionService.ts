import bcrypt from 'bcryptjs';

export interface IEncriptionService {
  comparePassword(password: string, testPassword: string): Promise<boolean>;
  hashPassword(password: string): Promise<string>;
}

interface Bcrypt {
  compare: (password: string, testPassword: string) => Promise<boolean>;
  genSalt: (rounds: number) => Promise<string>;
  hash: (password: string, salt: string) => Promise<string>;
}

class EncryptionService implements IEncriptionService {
	private bcrypt: Bcrypt;

	constructor(bcrypt: Bcrypt) {
		this.bcrypt = bcrypt;
	}

	async comparePassword(password: string, testPassword: string): Promise<boolean> {
		const matchPassword = await this.bcrypt.compare(password, testPassword);
		return matchPassword;
	}

	async hashPassword(password: string): Promise<string> {
		const bcryptSalt = await this.bcrypt.genSalt(12);
		const hashed = await this.bcrypt.hash(password, bcryptSalt);
		return hashed;
	}
}
const encryptionService = new EncryptionService(bcrypt);
export default encryptionService;
