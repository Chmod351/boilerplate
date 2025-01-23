import { Router } from 'express';
import userController from './user/userController';
const routes = Router();

// routes.get('/', userControllers.findAll);
// routes.get('/search', userControllers.findByQuery);
// routes.get('/:id', idChecker.containsIdInParams, userControllers.findById);
routes.post('/user/create', userController.create);
routes.post('/user/login', userController.login);
routes.post('/user/logout', userController.logout);
// routes.put('/update/:id', userController.update);
// routes.delete('/delete/:id', idChecker.containsIdInParams, userControllers.delete);

export default routes;
