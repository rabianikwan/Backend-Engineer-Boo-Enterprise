'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/profile.controller');
const postController = require('../controllers/post.controller');
const User = require('../models/user.model');
const { ErrorServer } = require('../common/error.common');
const { ErrorResp } = require('../common/okresp.common');

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

seedUser().then(() => {}).catch((err) => {
  console.log(err);
});


router.get('/', async (req, res) => {
  const profile = await userController.getUser(1);
  res.render('profile_template', { profile });
})


router.get('/:id', async (req, res) => {
  try {
    let profile = await userController.getUser(parseInt(req.params.id));
    if (!profile) {
      return res.status(404).send("user not found");
    }
    const posts = await postController.fetchPosts();
    const post = posts[0];
    res.cookie('post', post._id, { maxAge: 60 * 60 * 1000, httpOnly: true });
    res.cookie('profile', profile._id, { maxAge: 60 * 60 * 1000, httpOnly: true });
    res.render('profile_template', { profile });
  } catch(error) {
    console.log(error)
    const errorRes = new ErrorServer(error.message);
    return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, errorRes.message));
  }
})

module.exports = router;
