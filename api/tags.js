const express = require('express');
const tagsRouter = express.Router();
const { getAllTags, getPostsByTagName } = require('../db');

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /tags");

  next()
});

tagsRouter.get('/', async (req, res) => {
  const tags = await getAllTags();

  res.send({
    tags
  });
});

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
  const tag = req.params.tagName

  try {
      const allTaggedPosts = await getPostsByTagName(tag);
      const taggedPosts = allTaggedPosts.filter(post => {
          return (post.active && post.author.active) || (req.user && req.user.active && post.author.id === req.user.id);
      });
      
      res.send({ posts: taggedPosts })
  } catch ({ name, message }) {
      next({ name, message});
  };
});

module.exports = tagsRouter;