'use strict';

const mongoose = require('mongoose');

// this is our schema to represent a restaurant
const postSchema = mongoose.Schema({
  title: {String},
  content: {String},
  author: {
    firstName: String,
    lastName: String
  },
  created: {type: Date, required: true},
});

const Post = mongoose.model('Post', postSchema);
module.exports = {Post};
