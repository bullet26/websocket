import { Router } from 'express';
import { UserController } from './usersController.js';
import { authMiddlewareAccessToken } from '../middlewares/auth.js';
import validateSchema from '../utils/validation.js';
import { validationUserSchema } from './userSchema.js';

export const usersRouter = new Router();
export const userDefaultPath = '/api/users';

usersRouter.get('/', authMiddlewareAccessToken, UserController.getAll);
usersRouter.post('/registration', validateSchema(validationUserSchema), UserController.registration);
usersRouter.post('/login', UserController.login);
usersRouter.post('/logout', UserController.logout);
usersRouter.get('/refresh', UserController.refresh);

usersRouter.get('/:userId', authMiddlewareAccessToken, UserController.getByID);
usersRouter.patch('/:userId', authMiddlewareAccessToken, UserController.update);
