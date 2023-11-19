'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/entity/user.entity')
const userController = require('../controllers/profile.controller');
const { ErrorServer, ErrorUserInput } = require('../common/error.common');
const { ErrorResp, OkResp } = require('../common/okresp.common');
const userPath = '/v1/users'

router.get(`${userPath}`, async (_req, res) => {
    try {
        const profiles = await userController.fetchUsers();
        res.status(200).json(OkResp("success get users", profiles));
    } catch(error) {
        const errorRes = new ErrorServer("server error");
        return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, error));
    }
})

router.get(`${userPath}/:id`, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      const errorRes = new ErrorUserInput("id should be number");
      return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, errorRes.message));
    }
    const profile = await userController.getUser(id);

    if (!profile) {
      const errorRes = new ErrorUserInput("user not found");
      return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, errorRes.message));
    }
    res.status(200).json(OkResp("success get user", profile));

  } catch(error) {
    const errorRes = new ErrorServer("server error");
    return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, errorRes.message));
  }
})

router.post(`${userPath}`, async (req, res) => {
  try {
    const body = req.body;
    if (!body) {
      const errorRes = new ErrorUserInput("body is empty");
      return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, errorRes.message));
    }
    if (!body.name || !body.description || !body.mbti || !body.enneagram || !body.variant || !body.tritype || !body.socionics || !body.sloan || !body.psyche) {
      const errorRes = new ErrorUserInput("item(s) is missing");
      return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, errorRes.message));
    }
    const count_doc = await userController.countUsers()
    body.id = parseInt(count_doc) + 1;
    const user = new User(body.id, body.name, body.description, body.mbti, body.enneagram, body.variant, body.tritype, body.socionics, body.sloan, body.psyche);
    const profile = await userController.createUser(user);
    res.status(201).json(OkResp("success create user", profile));
  } catch(error) {
    // console.log(error)
    const errorRes = new ErrorServer("server error");
    return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, errorRes.message));
  }
})

router.patch(`${userPath}/:id`, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      const errorRes = new ErrorUserInput("id should be number");
      return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, errorRes.message));
    }
    const body = req.body;
    if (!body) {
      const errorRes = new ErrorUserInput("body is empty");
      return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, errorRes.message));
    }
    if (!body.name || !body.description || !body.mbti || !body.enneagram || !body.variant || !body.tritype || !body.socionics || !body.sloan || !body.psyche) {
      const errorRes = new ErrorUserInput("item(s) is missing");
      return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, errorRes.message));
    }
    const profile = await userController.updateUser(id, body);
    res.status(200).json(OkResp("success update user", profile));
  } catch(error) { 
    const errorRes = new ErrorServer("server error");
    return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, errorRes.message));
  }
})

router.delete(`${userPath}/:id`, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      const errorRes = new ErrorUserInput("id should be number");
      return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, errorRes.message));
    }
    const profile = await userController.deleteUser(id);
    res.status(200).json(OkResp("success delete user", profile));
  } catch(error) {
    const errorRes = new ErrorServer("server error");
    return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, errorRes.message));
  }
})

module.exports = router;
