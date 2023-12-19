import bcrypt from 'bcrypt';
import { TokenService } from '../tokens/tokenService.js';
import { createApiError } from '../utils/error.js';
import { UserDAL } from './usersDAL.js';

const getAll = async () => {
    return UserDAL.findAll();
};

const getByID = async id => {
    return UserDAL.findByID({ id });
};

const update = async ({ id, updateData }) => {
    if (updateData?.password) {
        updateData.password = await bcrypt.hash(updateData.password, 3);
    }

    await UserDAL.update({ id, updateData });

    return UserDAL.findByID({ id });
};

const registration = async user => {
    const existingUser = await UserDAL.findByOne({ email: user.email });
    if (existingUser) {
        throw createApiError({ message: `User with email: ${user.email} already exists`, type: 'badRequest' });
    }

    const hashPassword = await bcrypt.hash(user.password, 3);
    const data = await UserDAL.create({ ...user, password: hashPassword });
    const { password, ...userData } = data._doc; //объект с актуальными данными документа, избавленный от внутренних свойств Mongoose.
    const tokens = TokenService.generateTokens(userData);

    await TokenService.saveToken({
        user: data._id,
        refreshToken: tokens.refreshToken,
    });
    return {
        ...tokens,
        user: userData,
    };
};

const login = async user => {
    const userDB = await UserDAL.findByOne({ email: user.email });

    if (!userDB) {
        throw createApiError({ message: `User didn't find`, type: 'badRequest' });
    }
    const isPasswordEqual = await bcrypt.compare(user.password, userDB.password);

    if (!isPasswordEqual) {
        throw createApiError({ message: `Wrong password`, type: 'badRequest' });
    }

    const { password, ...userData } = userDB._doc;
    const tokens = TokenService.generateTokens(userData);

    await TokenService.saveToken({
        user: user._id,
        refreshToken: tokens.refreshToken,
    });

    return { ...tokens, user: userData };
};

const logout = async refreshToken => {
    const deleteTokenData = await TokenService.removeToken(refreshToken);

    if (!!deleteTokenData) {
        return { message: 'logout successful' };
    }
};

const refresh = async refreshToken => {
    if (!refreshToken) {
        throw createApiError({ type: 'unauthorized' });
    }

    const userTokenData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await TokenService.findToken(refreshToken);

    if (!userTokenData || !tokenFromDB) {
        throw createApiError({ type: 'unauthorized' });
    }

    const data = await UserDAL.findByID({ id: userTokenData._id });
    const { password, ...userData } = data._doc;
    const tokens = TokenService.generateTokens(userData);

    await TokenService.saveToken({
        user: userData.id,
        refreshToken: tokens.refreshToken,
    });

    return { ...tokens, data: userData };
};

export const UserService = {
    getAll,
    getByID,
    update,
    registration,
    login,
    logout,
    refresh,
};
