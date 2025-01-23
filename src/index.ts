import 'reflect-metadata';
import express from 'express';

import db from './helpers/dbConfig';

import errorHandler from './helpers/errorHandler';

import middlewares from './middlewares/middleware';
import routes from './api/routes';


export const app = express();

const apiUrl="/api/v1"


middlewares(app);


app.use(`${apiUrl}`,routes.userRoutes)


app.use(errorHandler);
app.listen(8000, () => {
	db()
	console.log('Server is running on port http://localhost:8000/ and socket ws://localhost:3000');
});
