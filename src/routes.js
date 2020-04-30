import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';
import PhotoMiddleware from './app/middlewares/file';

const routes = new Router();
// Rota para Login
routes.post('/register', UserController.store);

routes.post('/login', SessionController.store);

routes.get('/profile', authMiddleware, UserController.show);
routes.put('/profile', authMiddleware, UserController.update);
routes.delete('/profile', authMiddleware, UserController.delete);

routes.get('/photo', authMiddleware, PhotoMiddleware, FileController.show);
routes.post('/photo', authMiddleware, PhotoMiddleware, FileController.store);
routes.put('/photo', authMiddleware, PhotoMiddleware, FileController.update);
routes.delete('/photo', authMiddleware, PhotoMiddleware, FileController.delete);

export default routes;
