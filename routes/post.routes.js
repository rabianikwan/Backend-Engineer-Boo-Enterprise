'use strict';
const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const { ErrorServer, ErrorUserInput } = require('../common/error.common');
const { ErrorResp, OkResp } = require('../common/okresp.common');     
const Post = require('../models/post.model');
const PostCreate = require('../models/entity/post.entity');


const seedPost = async() => {
  const post = new Post({
    title: "MBTI Test",
    content: "test",
    created_at: Date.now(),
    updated_at: Date.now(),
    author: "A Martinez"
  });
  await post.save();
}

seedPost().then(() => {}).catch((err) => {
console.log(err)
});

const postPrefix = '/v1/posts'

router.get(`${postPrefix}`, async (_req, res) => {
  try {
    const posts = await postController.fetchPosts();
    res.status(200).json(OkResp("success get posts", posts));
  } catch(error) {
    const errorRes = new ErrorServer(error.message);
    return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, errorRes.message));
  }
})

router.get(`${postPrefix}/:id`, async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      const errorRes = new ErrorUserInput("id is empty");
      return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, errorRes.message));
    }
    const post = await postController.getPost(id);
    res.cookie('post', post._id, { maxAge: 60 * 60 * 1000, httpOnly: true });
    res.status(200).json(OkResp("success get post", post));
  } 
  catch (error) {
    const errorRes = new ErrorServer(error.message);
    return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, errorRes.message));
    }
})

router.post(`${postPrefix}`, async (req, res) => {
  try {
    const body = req.body;
    const profile = req.cookies.profile;
    if (!profile) {
      const errorRes = new ErrorUserInput("You're not logging in");
      return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, errorRes.message));
    }
    if (!body) {
      const errorRes = new ErrorUserInput("body is empty");
      return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, errorRes.message));
    }
    if (!body.title || !body.content) {
      const errorRes = new ErrorUserInput("item(s) is missing");
      return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, errorRes.message));
    }
    const post = new PostCreate(body.title, body.content, profile);
    const createdPost = await postController.createPost(post);
    res.status(201).json(OkResp("success create post", createdPost));
  } catch(error) {
    console.log(error)
    const errorRes = new ErrorServer(error.message);
    return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, errorRes.message));
  }
})

router.patch(`${postPrefix}/:id`, async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      const errorRes = new ErrorUserInput("id is empty");
      return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, errorRes.message));
    }
    const body = req.body;
    if (!body) {
      const errorRes = new ErrorUserInput("body is empty");
      return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, errorRes.message));
    }
    if (!body.title || !body.content) {
      const errorRes = new ErrorUserInput("item(s) is missing");
      return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, errorRes.message));
    }
    const updatedPost = await postController.updatePost(id, body);
    res.status(200).json(OkResp("success update post", updatedPost));
  } catch(error) {
    const errorRes = new ErrorServer(error.message);
    return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, errorRes.message));
  }
});

router.delete(`${postPrefix}/:id`, async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      const errorRes = new ErrorUserInput("id is empty");
      return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, errorRes.message));
    }
    const deletedPost = await postController.deletePost(id);
    res.status(200).json(OkResp("success delete post", deletedPost));
  } catch(error) {
    const errorRes = new ErrorServer(error.message);
    return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, errorRes.message));
  }
})

module.exports = router;