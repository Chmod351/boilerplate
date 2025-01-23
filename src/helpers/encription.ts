import encryptionService from "./EncriptionService";


class Encrypt {
	async hashPassword(password: string): Promise<string> {
		console.log(password);
		const hassedPassword= await encryptionService.hashPassword(password);
		return hassedPassword
	}

	async comparePassword(password: string, testPassword: string): Promise<boolean> {
		return await encryptionService.comparePassword(password, testPassword);
	
	}
}
export default Encrypt;
