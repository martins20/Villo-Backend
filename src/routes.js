import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import FileController from './app/controllers/FileController';
import FriendController from './app/controllers/FriendController';
import ConversationController from './app/controllers/ConversationController';

import authMiddleware from './app/middlewares/auth';
import PhotoMiddleware from './app/middlewares/file';

const routes = new Router();
// Login
routes.post('/register', UserController.store);
routes.post('/login', SessionController.store);

// User
routes.get('/profile/:id', authMiddleware, UserController.show);
routes.put('/profile', authMiddleware, UserController.update);
routes.delete('/profile', authMiddleware, UserController.delete);

// Friends
routes.post('/friends', authMiddleware, FriendController.store);
routes.get('/friends', authMiddleware, FriendController.index);
routes.delete('/friends/:id', authMiddleware, FriendController.delete);

// Photo
routes.get('/photo', authMiddleware, PhotoMiddleware, FileController.show);
routes.post('/photo', authMiddleware, PhotoMiddleware, FileController.store);
routes.put('/photo', authMiddleware, PhotoMiddleware, FileController.update);
routes.delete('/photo', authMiddleware, PhotoMiddleware, FileController.delete);

// Conversation
routes.get('/conversation/:id', ConversationController.show);
routes.get('/conversation', authMiddleware, ConversationController.index);
routes.post('/conversation/:id', authMiddleware, ConversationController.store);
routes.put('/conversation/:id', authMiddleware, ConversationController.update);
routes.delete(
  '/conversation/:id',
  authMiddleware,
  ConversationController.delete
);

export default routes;
