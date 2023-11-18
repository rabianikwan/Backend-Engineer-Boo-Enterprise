'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userController = require('../controllers/profile.controller');
const User = require('../models/profile.model');
const { ErrorServer, ErrorUserInput } = require('../common/error.common');
const { ErrorResp, OkResp } = require('../common/okresp.common');

// seed user
const seedUser = async() => {
  const user = new User({
    id: "1",
    name: 'A Martinez',
    description: 'Adolph Larrue Martinez III.',
    mbti: 'ISFJ',
    enneagram: '9w3',
    variant: 'sp/so',
    tritype: 725,
    socionics: 'SEE',
    sloan: 'RCOEN',
    psyche: 'FEVL',
    image: 'https://soulverse.boo.world/images/1.png',
  });
  await user.save();
}

seedUser().then(() => {
  console.log('User has been seeded...');
}).catch((err) => {
  console.log(err);
});

// seed user

router.get('/', async (req, res) => {
  const profile = await userController.getUser(1);
  res.render('profile_template', { profile });
})

router.get('/:id', async (req, res) => {
  try {
    let profile = await userController.getUser(parseInt(req.params.id));
    if (!profile) {
      profile = {
        id: "User not found",
        name: 'User not found',
        description: 'User not found',
        mbti: 'User not found',
        enneagram: 'User not found',
        variant: 'User not found',
        tritype: 0,
        socionics: 'User not found',
        sloan: 'User not found',
        psyche: 'User not found',
        image: 'https://soulverse.boo.world/images/1.png',
      }
    }
    res.render('profile_template', { profile });
  } catch(error) {
    const errorRes = new ErrorServer("server error");
    return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, errorRes.message));
  }
})


router.get('/users', async (_req, res) => {
  try {
    const profiles = await userController.countUsers();
    console.log(profiles)
    res.status(200).json(OkResp("success get users", profiles));
  } catch(error) {
    const errorRes = new ErrorServer("server error");
    return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, error));
  }
})

router.get('/users/:id', async (req, res) => {
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

router.post('/users', async (req, res) => {
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
    const user = new User(body);
    const profile = await userController.createUser(user);
    res.status(201).json(OkResp("success create user", profile));
  } catch(error) {
    const errorRes = new ErrorServer("server error");
    return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, errorRes.message));
  }
})


module.exports = router;
