import { UserService } from './usersService.js';

const getAll = async (req, res, next) => {
    try {
        const data = await UserService.getAll(req.query);
        res.json(data);
    } catch (err) {
        next(err);
    }
};

const getByID = async (req, res, next) => {
    try {
        const data = await UserService.getByID(req.params.userId);
        res.json(data);
    } catch (err) {
        next(err);
    }
};

const update = async (req, res, next) => {
    try {
        const data = await UserService.update({
            id: req.params.userId,
            updateData: req.body,
        });

        res.json(data);
    } catch (err) {
        next(err);
    }
};

const registration = async (req, res, next) => {
    try {
        const userData = await UserService.registration(req.body);
        res.cookie('refreshToken', userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        });
        res.json(userData);
    } catch (err) {
        next(err);
    }
};

const login = async (req, res, next) => {
    try {
        const userData = await UserService.login(req.body);
        res.cookie('refreshToken', userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        });
        res.json(userData);
    } catch (err) {
        next(err);
    }
};

const logout = async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;
        const data = await UserService.logout(refreshToken);

        res.clearCookie('refreshToken');

        res.json(data);
    } catch (err) {
        next(err);
    }
};

const refresh = async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;

        const userData = await UserService.refresh(refreshToken);

        res.cookie('refreshToken', userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        });

        res.json(userData);
    } catch (err) {
        next(err);
    }
};

export const UserController = {
    getAll,
    getByID,
    update,
    registration,
    login,
    logout,
    refresh,
};
