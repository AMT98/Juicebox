const express = require('express');
const usersRouter = express.Router();
const { getAllPosts } = require('../db');

usersRouter.use((req, res, next) => {
  console.log("A request is being made to /posts");

  res.send({ message: 'hello from /posts!' });
  next()
});

usersRouter.get('/posts', async (req, res) => {
  const posts = await getAllPosts();

  res.send({
    posts
  });
});
module.exports = usersRouter;