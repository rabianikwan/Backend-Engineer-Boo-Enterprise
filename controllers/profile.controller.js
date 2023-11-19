'use strict';
const { ErrorServer } = require('../common/error.common');
const UserModel = require('../models/user.model');


const fetchUsers = async () => {
    return UserModel.find({})
}

const countUsers = async () => {
    return UserModel.countDocuments();
}

const getUser = async (id) => {
    try {
    const user = await UserModel.findOne({ "id": id });
    if (!user) {
        return null;
    }
    return user;
    } catch (err) {
        throw new ErrorServer(err);
    }
}

const getUserByObjId = async (id) => {
    const user = await UserModel.findById(id);
    if (!user) {
        const errorRes = new ErrorServer("user not found");
        return errorRes;
    }
    return user;
}

const createUser = async (user) => {
    return await UserModel.create(user);
}

const updateUser = async(id, user) => {
    try {
    const userModel = await UserModel.findOne({ "id": id });
    if (!userModel) {
        const errorRes = new ErrorServer("user not found");
        return errorRes;
    }
    return UserModel.findByIdAndUpdate(id, user);
    } catch (err) {
        throw new ErrorServer(err);
    }
}

const deleteUser = async(id) => {
    try {
    const userModel = await UserModel.findOne({ "id": id });
    if (!userModel) {
        const errorRes = new ErrorServer("user not found");
        return errorRes;
    }
    return UserModel.findByIdAndDelete(id);
    } catch (err) {
        throw new ErrorServer(err);
    }
}

module.exports = {
    fetchUsers,
    countUsers,
    getUser,
    createUser,
    updateUser,
    getUserByObjId,
    deleteUser
}