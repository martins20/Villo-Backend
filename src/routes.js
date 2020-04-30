import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
// Rota para Login
routes.post('/register', UserController.store);

routes.post('/login', SessionController.store);

routes.get('/profile', authMiddleware, UserController.show);
routes.put('/profile', authMiddleware, UserController.update);
routes.delete('/profile', authMiddleware, UserController.delete);

export default routes;
