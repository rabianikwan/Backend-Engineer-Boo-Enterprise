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
    const posts = await postController.fetchPosts();
    const post = posts[0];
    res.cookie('post', post._id, { maxAge: 60 * 60 * 1000, httpOnly: true });
    res.cookie('profile', profile._id, { maxAge: 60 * 60 * 1000, httpOnly: true });
    res.render('profile_template', { profile });
  } catch(error) {
    const errorRes = new ErrorServer("server error");
    return res.status(errorRes.code).json(ErrorResp(errorRes.code, errorRes.name, errorRes.message));
  }
})

module.exports = router;
