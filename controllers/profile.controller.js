'use strict';
const { ErrorUserInput, ErrorServer } = require('../common/error.common');
const UserModel = require('../models/profile.model');



const fetchUsers = async () => {
    const users = await UserModel.find({});
    console.log(users)
    return users;
}

const countUsers = async () => {
    const count = await UserModel.count();
    return count;
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
    const user = await UserModel.findOne({ "_id": id });
    return user;
}

const createUser = async (user) => {
    const created_user = await UserModel.create(user);
    return created_user;
}

const updateUser = async(id, user) => {
    const updated_user = await UserModel.findByIdAndUpdate(id, user);
    return updated_user;
}

module.exports = {
    fetchUsers,
    countUsers,
    getUser,
    createUser,
    updateUser,
    getUserByObjId
}