const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

BlogPosts.create("Hello", "Really important stuff to say","Dave Cabrini");
BlogPosts.create("Everything is Awesome", "more important stuff to say", "Nigel Mansell");
BlogPosts.create("Your Mother", "Great content here", "Madam Stoopido");

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

    id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  })
  res.json(updatedPost);
})

module.exports = router;
