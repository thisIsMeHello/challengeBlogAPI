

const express = require('express');
const morgan = require('morgan');

const blogPostsRouter = require('./blogPostsRouter');

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.use('/blog-posts', blogPostsRouter);

app.listen(process.env.PORT || 3000, () => console.log(
  `Your app is listening on port ${process.env.PORT || 3000}`));
