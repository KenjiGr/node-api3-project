const express = require('express');
const User = require('./users-model');
const Post = require('../posts/posts-model');
const {validateUserId, validateUser, validatePost} = require('../middleware/middleware');
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  User.get().then(users => {
    res.json(users);
  })
});

router.get('/:id', validateUserId, (req, res, next) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.body.user);
});

router.post('/', validateUser, (req, res) => {
  User.insert(req.body).then(newUser => {
    console.log(newUser);
    res.status(201).json(newUser);
  })
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  User.update(req.params.id, req.body).then(updatedUser => {
    console.log(updatedUser);
    res.json(updatedUser);
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  User.remove(req.params.id).then(deletedUser => {
    console.log(deletedUser);
    res.json(deletedUser);
  })
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  User.getUserPosts(req.params.id).then(posts => {
    res.json(posts);
  }).catch(next)
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  try {
    const end = await Post.insert({
      user_id: req.params.id,
      text: req.body.text,
    });
    res.status(201).json(end);
  } catch (err) {
    next(err);
  }
});

// do not forget to export the router
module.exports = router;