import UsersModel from './UsersModel.js';

const create = async user => {
    console.log('user', user);

    return new UsersModel(user).save();
};

const findAll = async () => {
    const data = await UsersModel.find().sort({ status: 1 }).select('-createdAt -updatedAt');
    return data;
};

const findByID = async ({ id }) => {
    return UsersModel.findById(id);
};

const findByOne = async findOneObj => {
    return UsersModel.findOne(findOneObj);
};

const update = async ({ id, updateData }) => {
    return UsersModel.findByIdAndUpdate(id, updateData);
};

const deleteUser = async ({ id }) => {
    return UsersModel.findByIdAndDelete(id);
};

export const UserDAL = {
    create,
    findAll,
    findByID,
    findByOne,
    update,
    deleteUser,
};
