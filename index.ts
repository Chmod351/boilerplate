import 'reflect-metadata';
import express from 'express';

import db from './src/helpers/dbConfig';

import errorHandler from './src/helpers/errorHandler';

import middlewares from './src/middlewares/middleware';
import routes from './src/app/routes';


export const app = express();

const apiUrl="/api/v1"


middlewares(app);


app.use(`${apiUrl}`,routes)


app.use(errorHandler);
app.listen(8000, () => {
	db()
	console.log('Server is running on port http://localhost:8000/ and socket ws://localhost:3000');
});
