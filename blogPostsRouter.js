const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

BlogPosts.create("This Sucks", "Really important stuff to say","Dave Cabrini");
BlogPosts.create("Everything is Bollocks", "more important stuff to say", "Nigel Mansell");
BlogPosts.create("Your Mother", "The life and Times of a hoe", "Madam Stoopido");

router.get('/', (req, res) => {
  res.json(BlogPosts.get());
});

router.post('/', jsonParser, (req, res) => {
  console.log(req.body);
  const item = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
  res.status(201).json(item);
})

router.delete('/:id', (req, res) => {
  BlogPosts.delete(req.params.id);
  console.log(`Deleted blog psot \`${req.params.ID}\``);
  res.status(204).end();
});

router.put('/:id', jsonParser, (req, res) => {
  console.log("updating");
  const updatedPost = BlogPosts.update({
    title: req.params.id,
    content: req.body.content,
    author: req.body.author
  })
})

module.exports = router;
