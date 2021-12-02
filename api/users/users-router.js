const express = require('express');
const User = require('./users-model');
const Post = require('../posts/posts-model');
const {logger, validateUserId, validateUser, validatePost} = require('../middleware/middleware');
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', logger, (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  User.get().then(users => {
    res.json(users);
  })
});

router.get('/:id', logger, validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.user);
});

router.post('/', logger, validateUser, (req, res) => {
  User.insert(req.body).then(newUser => {
    console.log(newUser);
    res.json(newUser);
  })
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', logger, validateUserId, validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  User.update(req.params.id, req.body).then(updatedUser => {
    console.log(updatedUser);
    res.json(updatedUser);
  })
});

router.delete('/:id', logger, validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  User.remove(req.params.id).then(deletedUser => {
    console.log(deletedUser);
    res.json(deletedUser);
  })
});

router.get('/:id/posts', logger, validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  Post.get().then(posts => {
    res.json(posts);
  })
});

router.post('/:id/posts', logger, validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Post.insert(req.body).then(newPost => {
    res.json(newPost);
  })
});

// do not forget to export the router
module.exports = router;