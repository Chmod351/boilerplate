
import {IUser,UserBody} from './userModel';
import repository, {DB_ID} from '../../repository/repository'

class UserServices {
	async findById(id: string | DB_ID): Promise<IUser | null> {
		return await repository.user.findById(id);
	}
	async findByEmail(email: string): Promise<IUser | null> {
		return await repository.user.findByEmail(email);
	}
	async createUser(body: UserBody): Promise<IUser> {
		return await repository.user.create(body as IUser);
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
