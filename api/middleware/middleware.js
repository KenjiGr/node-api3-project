const User = require('../users/users-model')

function logger(req, res, next) {
  console.log(req.method, req.url, Date.now());
  next();
  // DO YOUR MAGIC
}

async function validateUserId(req, res, next) {
  try{
    const user = await User.getById(req.params.id);
    if(user){
      req.user = user
    }else{
      next({status: 404, message: 'user not found'});
    }
  }catch (err){
    next(err)
  }
  // DO YOUR MAGIC
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ message: 'missing required name field' });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const { text } = req.body;
  if (!text) {
    res.status(400).json({ message: 'missing required text field' });
  } else {
    next();
  }
}

// do not forget to expose these functions to other modules
module.exports = {logger, validateUserId, validateUser, validatePost}