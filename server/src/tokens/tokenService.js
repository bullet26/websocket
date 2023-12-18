import jwt from 'jsonwebtoken';
import { TokenDAL } from './tokenDAL.js';

const generateTokens = userData => {
    const accessToken = jwt.sign(userData, process.env.JWT_ACCESS_SECRET, {
        expiresIn: '15m',
    });
    const refreshToken = jwt.sign(userData, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '30d',
    });
    return {
        accessToken,
        refreshToken,
    };
};

const saveToken = async ({ user, refreshToken }) => {
    try {
        const tokenData = await TokenDAL.getOne({ user });
        if (tokenData) {
            await TokenDAL.update({
                user: tokenData.user,
                refreshToken,
            });
        }
        const token = await TokenDAL.create({
            user,
            refreshToken,
        });
        return token;
    } catch (error) {
        return null;
    }
};

const removeToken = async refreshToken => {
    try {
        const deleteTokenData = await TokenDAL.deleteToken({ refreshToken });
        return deleteTokenData;
    } catch (error) {
        return null;
    }
};

const findToken = async refreshToken => {
    const tokenData = await TokenDAL.getOne({ refreshToken });
    return tokenData;
};

const validateAccessToken = token => {
    try {
        return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (err) {
        return null;
    }
};

const validateRefreshToken = refreshToken => {
    try {
        return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (err) {
        return null;
    }
};

export const TokenService = {
    generateTokens,
    removeToken,
    saveToken,
    findToken,
    validateAccessToken,
    validateRefreshToken,
};
