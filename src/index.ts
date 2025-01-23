import 'reflect-metadata';
import express from 'express';

import db from './helpers/dbConfig';
import enviroments from './helpers/envConfig';

import errorHandler from './helpers/errorHandler';


import middlewares from './middlewares/middleware';
import routes from './api/routes';


export const app = express();

const apiUrl="/api/v1"


middlewares(app);


app.use(`${apiUrl}`,routes.userRoutes)


app.use(errorHandler);
app.listen(enviroments.PORT, () => {
	db()
	console.log('Server is running on port ', enviroments.PORT);
});
