import { Inject, Service } from 'typedi';

import mongoose, { Model } from 'mongoose';

import {IUser} from '../app/user/userModel';
import User from '../app/user/userModel';


export interface DeleteResult {
  deletedCount: number;
}


export interface DB_ID {
  _id: mongoose.Types.ObjectId
}

export interface IRepository<T> {
  findAll(page: number): Promise<{ data: T[]; totalItems: number; totalPages: number }>;
  findByQuery(query: object, page: number): Promise<{ data: T[]; totalItems: number; totalPages: number }>;
  findById(id: DB_ID | string): Promise<T | null>;
  create(item: T): Promise<T>;
  update(id: DB_ID | string, item:object): Promise<T | null>;
  delete(id: DB_ID | string): Promise<DeleteResult>;
}



@Service()
class Repository<T> implements IRepository<T> {
	constructor(@Inject('model') private model: Model<T>) {}
	async findAll(page: number): Promise<{ data: T[]; totalItems: number; totalPages: number }> {
		const itemsPerPage: number = 50,
			skip: number = (page - 1) * itemsPerPage;

		const totalItems = await this.model.countDocuments().exec();
		const totalPages = Math.ceil(totalItems / itemsPerPage);

		const data = await this.model.find().skip(skip).limit(itemsPerPage).exec();

		return { data, totalItems, totalPages };
	}

	async findByQuery(query: object, page: number): Promise<{ data: T[]; totalItems: number; totalPages: number }> {
		const itemsPerPage: number = 50,
			skip: number = (page - 1) * itemsPerPage;

		const totalItems = await this.model.countDocuments(query).exec();

		const totalPages = Math.ceil(totalItems / itemsPerPage);

		const data = await this.model.find(query).skip(skip).limit(itemsPerPage).exec();

		return { data, totalItems, totalPages };
	}

	async findById(id: DB_ID | string): Promise<T | null> {
		return await this.model.findById(id).exec();
	}
	async findByEmail(email: string): Promise<T | null> {
		return await this.model.findOne({ email }).exec();
	}
	/*  async aggregate(pipeline: any[]): Promise<T[]> { */
	/* return await this.model.aggregate(pipeline).exec(); */
	/* } */
	async create(item: T): Promise<T> {
		return await this.model.create(item);
	}
	async update(id: DB_ID | string, item: object): Promise<T | null> {
		const updated: T | null = await this.model
			.findOneAndUpdate({ _id: id }, item, {
				new: true,
				runValidators: true,
			})
			.exec();
		return updated;
	}

	async delete(id: DB_ID | string): Promise<DeleteResult> {
		return await this.model.deleteOne({ _id: id }).exec();
	}
}

const user = new Repository<IUser>(User);


const repository = {
	user,

};

export default repository;
