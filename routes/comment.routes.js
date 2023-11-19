'use strict';
const { CommentCreate, Pollings }= require("../models/entity/comment.entity");
const commentController = require("../controllers/comment.controller");
const Comment = require("../models/comment.model");
const { ErrorResp, OkResp } = require("../common/okresp.common");
const { ErrorServer, ErrorUserInput } = require("../common/error.common");
const userController = require("../controllers/profile.controller");
const express = require('express');
const routes = express.Router();


const seedComment = async() => {
    const users = await userController.fetchUsers();

    const comment = new Comment({
      title: "INTJ",
      description: "this is my result",
      post_id: "1",
      author_id: "1",
      likes_users: ["1234", "4321"],
      likes: 2,
      pollings: {
        mbti: "INTJ",
        zodiac: "Taurus",
        enneagram: ""
      },
      created_at: Date.now(),
      updated_at: Date.now(),
    });
    const comment2 = new Comment({
        title: "INTP",
        description: "this is my result",
        post_id: "2",
        author_id: "1",
        likes_users: ["1234"],
        likes: 1,
        pollings: {
          mbti: "INTP",
          zodiac: "Cancer",
          enneagram: ""
        },
        created_at: Date.now(),
        updated_at: Date.now(),
      });
      const comment3 = new Comment({
        title: "INFJ",
        description: "this is my result",
        post_id: "2",
        author_id: "1",
        likes_users: ["1", "2", "3", "4"],
        likes: 4,
        pollings: {
          mbti: "INFJ",
          zodiac: "",
          enneagram: "5w4"
        },
        created_at: Date.now(),
        updated_at: Date.now(),
      });
      const comment4 = new Comment({
        title: "INFJ",
        description: "this is my result",
        post_id: "2",
        author_id: "1",
        likes_users: ["1", "2", "4"],
        likes: 4,
        pollings: {
          mbti: "INFJ",
          zodiac: "",
          enneagram: "5w4"
        },
        created_at: Date.now(),
        updated_at: Date.now(),
      });
      await comment.save();
      await comment2.save();
      await comment3.save();
      await comment4.save();
  }

seedComment().then(() => {
    console.log("seeded comment")
    }).catch((err) => {
    console.log(err)
});

const commentPrefix = '/v1/comments';

routes.get(`${commentPrefix}`, async (_req, res) => {
    try {
        const comments = await commentController.sortRecent();
        res.status(200).json(OkResp("success get comments", comments));
    } catch(error) {
        const errorRes = new ErrorServer("server error");
        return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, error));
    }
})

routes.get(`${commentPrefix}/:id`, async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      const errorRes = new ErrorUserInput("wrong id format");
      return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, errorRes.message));
    }
    const comment = await commentController.getComment(id);
    if (!comment) {
      const errorRes = new ErrorUserInput("comment not found");
      return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, errorRes.message));
    }
    res.status(200).json(OkResp("success get comment", comment));

  } catch(error) {
    const errorRes = new ErrorServer("server error");
    return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, error));
  }
})

routes.get(`${commentPrefix}/bests`, async (req, res) => {
    try {
        const comments = await commentController.sortBest();
        res.status(200).json(OkResp("success get comments", comments));
    } catch(error) {
        const errorRes = new ErrorServer("server error");
        return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, error));
    }
})

routes.patch(`${commentPrefix}/:id/likes`, async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      const errorRes = new ErrorUserInput("wrong id format");
      return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, errorRes.message));
    }
    const getUser = await commentController.getComment(id);
    if (!getUser) {
      const errorRes = new ErrorUserInput("comment not found");
      return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, errorRes.message));
    }
    const user_id = req.cookies.profile;
    if (!user_id) {
      const errorRes = new ErrorUserInput("Youre not logged in");
      return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, errorRes.message));
    }

    const comment = await commentController.getComment(id);
    if (!comment) {
      const errorRes = new ErrorUserInput("comment not found");
      return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, errorRes.message));
    }
    if (comment.likes_users.includes(user_id)) {
      const newLike = comment.likes - 1;
      const likeusers = comment.likes_users;
      likeusers.splice(likeusers.indexOf(user_id), 1);
      const updateComment = await commentController.updateComment(id, {likes: newLike, likes_users: likeusers});
      return res.status(200).json(OkResp("success unlike comment", updateComment));
    }
    const newLike = comment.likes + 1;
    const likeusers = comment.likes_users;
    likeusers.push(user_id);
    const updateComment = await commentController.updateComment(id, {likes: newLike, likes_users: likeusers});
    res.status(200).json(OkResp("success like comment", updateComment));

  } catch(error) {
    console.log(error)
    const errorRes = new ErrorServer("server error");
    return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, error));
  }
})

routes.patch(`${commentPrefix}/:id/pollings`, async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      const errorRes = new ErrorUserInput("wrong id format");
      return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, errorRes.message));
    }
    const getUser = await commentController.getComment(id);
    if (!getUser) {
      const errorRes = new ErrorUserInput("comment not found");
      return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, errorRes.message));
    }
    const body = req.body;
    if (!body.pollings.mbti || !body.pollings.zodiac || !body.pollings.enneagram) {
      const errorRes = new ErrorUserInput("item(s) is missing");
      return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, errorRes.message));
    }
    const pollings = new Pollings(body.pollings.mbti, body.pollings.zodiac, body.pollings.enneagram);
    console.log(pollings)
    const updatePollings = await commentController.givepollings(id, pollings);
    res.status(200).json(OkResp("success update pollings", updatePollings));

  } catch(error) {
    console.log(error)
    const errorRes = new ErrorServer("server error");
    return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, error));
  }
})

routes.post(`${commentPrefix}`, async (req, res) => {
    try {
        const body = req.body;
        if (!body) {
            const errorRes = new ErrorUserInput("body is empty");
            return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, errorRes.message));
        }
        const author = req.cookies.profile;
        if (!author) {
            const errorRes = new ErrorUserInput("You Are Not Logged In");
            return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, errorRes.message));
        }
        const post = req.cookies.post;
        if (!post) {
            const errorRes = new ErrorUserInput("Post not selected");
            return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, errorRes.message));
        }
        body.post_id = post;
        body.author_id = author;
        const comment = new CommentCreate(body.title, body.description, body.pollings, body.post_id, body.author_id);
        console.log(comment)
        const profile = await commentController.giveComment(comment);
        res.status(200).json(OkResp("success update comment", profile));
    } catch(error) {
        console.log(error)
        const errorRes = new ErrorServer("server error");
        return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, errorRes.message));
    }
})


module.exports = routes;


