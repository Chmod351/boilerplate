import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';


const corsConfig = cors({
	origin: (origin, callback) => {
		const allowedOrigins = ['https://ciervademo.onrender.com', 'http://localhost:3000'];
		console.log({ origin });
		if (!origin || allowedOrigins.includes(origin)) {
			callback(null, true); // Permite el origen
		} else {
			callback(new Error('Not allowed by CORS')); // Rechaza el origen
		}
	}, // Solo permite solicitudes desde esta URL
	credentials: true, // Permitir envío de cookies y cabeceras de autenticación
	allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
	exposedHeaders: ['Content-Type'], // Cabeceras expuestas al frontend
});

const sessionConfig = session({
	cookie: {
		secure:false, // true para HTTPS en producción
		httpOnly: true, // Asegura que la cookie solo sea accesible desde HTTP(S)
		sameSite: 'lax', // Permitir credenciales en solicitudes de origen cruzado
	},
	resave: false, // No guardar la sesión si no hay cambios
	saveUninitialized: false, // No guardar sesiones vacías
	secret:  '1234', // Clave secreta para firmar cookies
});

export default function middlewares(app: Application) {
	app.use(corsConfig);
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(morgan('dev'));
	app.use(sessionConfig);
}
