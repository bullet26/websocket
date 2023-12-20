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

/**
 * @typedef UserDto
 * @property {string} name.required
 * @property {string} surname.required
 * @property {string} email.required
 * @property {string} password.required
 * @property {string} role
 * @property {string} status
 */

/**
 * @typedef RefreshTokenRequest
 * @property {string} refreshToken.required - Refresh token obtained from cookies
 */

/**
 * @typedef RegistrationRequest
 * @property {string} name.required
 * @property {string} surname.required
 * @property {string} email.required
 * @property {string} password.required
 * @property {string} role
 */

/**
 * @typedef LoginRequest
 * @property {string} email.required
 * @property {string} password.required
 */

/**
 * @typedef AuthResponse
 * @property {string} accessToken.required
 * @property {string} refreshToken.required
 * @property {UserDto.model} user.required
 */
/**
 * @typedef ApiError
 * @property {string} message
 */

/**
 * @route POST api/user/registration
 * @group  User
 * @param {RegistrationRequest.model} request.body.required - Registration data
 * @returns {AuthResponse.model} 200 - Successful registration
 * @returns {ApiError.model} 500 - Default error
 * @returns {ApiError.model} 400 - Bad request
 */

/**
 * @route POST api/user/login
 * @group  User
 * @param {LoginRequest.model} request.body.required - Login data
 * @returns {AuthResponse.model} 200 - Successful login
 * @returns {ApiError.model} 500 - Default error
 * @returns {ApiError.model} 400 - Bad request
 */

/**
 * @route POST api/user/logout
 * @group  User
 * @returns {string} 200 - Successful logout
 * @returns {ApiError.model} 500 - Default error
 */

/**
 * @route GET api/user/refresh
 * @group  User
 * @returns {AuthResponse.model} 200 - Successful refresh
 * @returns {ApiError.model} 500 - Default error
 * @returns {ApiError.model} 401 - Unauthorized
 */
