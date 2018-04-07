

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { PORT, DATABASE_URL } = require('./config');
const { Post } = require('./models/post');

mongoose.connect(DATABASE_URL);

const app = express();

const blogPostsRouter = require('./blogPostsRouter');

app.use(morgan('common'));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// app.use('/blog-posts', blogPostsRouter);
app.get('/blog-posts', (req, res) => {
  Post.find().then(posts => res.json(posts));
});

// app.listen(process.env.PORT || 3000, () => console.log(
//   `Your app is listening on port ${process.env.PORT || 3000}`));

  function runServer() {
    return new Promise((resolve, reject) => {
      server = app.listen(PORT, () => {
        console.log(`Your app is listening on PORT ${PORT}`);
        resolve(server);
      }).on('error', err => {
        reject(err)
      });
    });
  }

  // like `runServer`, this function also needs to return a promise.
  // `server.close` does not return a promise on its own, so we manually
  // create one.
  function closeServer() {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          reject(err);
          // so we don't also call `resolve()`
          return;
        }
        resolve();
      });
    });
  }

  // if server.js is called directly (aka, with `node server.js`), this block
  // runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
  if (require.main === module) {
    runServer().catch(err => console.error(err));
  };

  module.exports = {app, runServer, closeServer};
