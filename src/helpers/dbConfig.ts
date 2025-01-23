import enviroments from './envConfig';
import mongoose from 'mongoose';

const url: string | undefined = enviroments.MONGO_DB;
const connect = () => {
	if (!url) {
		throw new Error("MONGO_DB is not defined");
	}
	mongoose
		.connect(url)
		.then(() => {
			console.log("conected");
		})
		.catch((err: Error) => {
			throw err;
		});
};

export default connect;
