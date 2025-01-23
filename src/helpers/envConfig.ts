import { config } from 'dotenv';
config();

type EnvConfig = {
  MONGO_DB?: string;
  ORIGIN: string;
  PORT?: string;
  SECRET_KEY?: string;
  EMAIL_SENDER?: string;

};

const ENV: EnvConfig = {
	MONGO_DB: process.env.MONGO_DB,
	ORIGIN: process.env.ORIGIN ?? '*',
	PORT: process.env.PORT,
	SECRET_KEY: process.env.SECRET_KEY,
	EMAIL_SENDER: process.env.EMAIL_SENDER
};
console.log({ ENV });
export default ENV;
