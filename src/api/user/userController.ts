
import {IMySessionData, IUser,} from './userModel';
import { NextFunction, Request, Response } from 'express';
import Encrypt from '../../helpers/encription';
import userService from './userService';

const encryption = new Encrypt();

class UserController {
	async findById(req: Request, res: Response, next: NextFunction) {
		try {
			const userId: string = req.params.id;
			const user: IUser | null = await userService.findById(userId);
			res.status(200).json(user);
		} catch (error) {
			next(error);
		}
	}
	async update(req: Request, res: Response, next: NextFunction) {
		try {
			const { password } = req.body;
			const hashedPassword = await encryption.hashPassword(password);
			const userId: string = req.params.id;
			const newUser: IUser | null = await userService.updateUser(userId, {
				password: hashedPassword,
			});
			res.status(200).json(newUser);
		} catch (error) {
			next(error);
		}
	}

	async create(req: Request, res: Response, next: NextFunction) {
		const { username, password, email } = req.body;

		if (!username || !password || !email) {
			console.log('faltan campos', username, password, email);
			return res.status(400).json({ error: "faltan campos" });
		}
		try {
			console.log(req.body);

			const hashedPassword = await encryption.hashPassword(password);
			console.log(hashedPassword);
			const user: IUser  = await userService.createUser({
				email,
				password: hashedPassword,
				username,
			});
			res.status(200).json(user);
		} catch (error) {
			next(error);
		}
	}
	async login(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, password } = req.body;
			console.log('email y password', email, password);
			const user: IUser | null = await userService.findByEmail(email);
			if (user !== null) {
				const match: boolean = await encryption.comparePassword(password, user.password);
				if (!user || !match) {
					res.status(400).json({ message: 'password or email invalid' });
				} else {
					req.session.regenerate((err) => {
						if (err) {
							return next(err);
						}
						(req.session as IMySessionData).user = {
							type: user.type,
						};
						console.log(user);
						(req.session as IMySessionData).loggedin = true;
					   
						res.status(200).json({
							message: 'Logged in successfully',
							session: req.session,
							user,
						});
					});
				}
			} else {
				res.status(400).json({ message: 'password or email invalid' });
			}
		} catch (error) {
			next(error);
		}
	}
	async logout(req: Request, res: Response, next: NextFunction) {
		try {
			req.session.destroy(function (err) {
				if (err) {
					next(err);
				} else {
					res.clearCookie('sessionId');
					res.status(200).json({ message: 'Logged out successfully' });
				}
			});
		} catch (error) {
			next(error);
		}
	}
	// async delete(req: Request, res: Response, next: NextFunction) {
	//   try {
	//     const userId: string = req.params.id;
	//     const deletedUser = await userService.deleteUser(userId);
	//     res.status(200).json({ message: 'deleted successfully', deletedUser });
	//   } catch (error) {
	//     next(error);
	//   }
	// }
}

const userController = new UserController();
export default userController;
