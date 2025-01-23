
import {IUser,UserBody} from './userModel';
import repository, {DB_ID} from '../../repository/repository'
import emailService from '../../helpers/emailService';

class UserServices {
	async findById(id: string | DB_ID): Promise<IUser | null> {
		return await repository.user.findById(id);
	}
	async findByEmail(email: string): Promise<IUser | null> {
		return await repository.user.findByEmail(email);
	}
	async createUser(body: UserBody): Promise<IUser> {
		const createdUSer=	await repository.user.create(body as IUser);
		try {
			await emailService.sendEmail({
				from: '4JUd4@example.com',
				to: createdUSer.email,
				subject: 'Welcome to the app',
				text: 'Welcome to the app',
				html: '<h1>Welcome to the app</h1>',
			})
		} catch (e) {
			/* handle error */
			console.log(e)
		}
		return createdUSer
	}
	async updateUser(id: string, info: object): Promise<IUser | null> {
		return await repository.user.update(id, info);
	}
	async deleteUser(id: string) {
		return await repository.user.delete(id);
	}
}

const userService = new UserServices();

export default userService;
