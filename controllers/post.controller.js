'use strict';
const { ErrorServer, ErrorUserInput } = require('../common/error.common');
const PostModel = require('../models/post.model');

const fetchPosts = async () => {
    try {
        const posts = await PostModel.find();
        return posts;
    } catch(error) {
        const errorRes = new ErrorServer("server error");
        return errorRes;
    }
}

const getPost = async (id) => {
    try {
        const post = await PostModel.findById(id);
        return post;
    } catch(error) {
        const errorRes = new ErrorUserInput("user input error");
        return errorRes;
    }
}

const createPost = async (post) => {
    try {
        const newPost = new PostModel(post);
        const savedPost = await newPost.save();
        return savedPost;
    } catch(error) {
        const errorRes = new ErrorServer("server error");
        return errorRes;
    }
}

const deletePost = async (id) => {
    try {
        const deletedPost = await PostModel.findByIdAndDelete(id);
        return deletedPost;
    } catch(error) {
        const errorRes = new ErrorServer("server error");
        return errorRes;
    }
}

const updatePost = async (id, post) => {
    try {
        const updatedPost = await PostModel.findByIdAndUpdate(id, post);
        return updatedPost;
    } catch(error) {
        const errorRes = new ErrorServer("server error");
        return errorRes;
    }
}
module.exports = {
    fetchPosts,
    getPost,
    createPost,
    deletePost,
    updatePost
}