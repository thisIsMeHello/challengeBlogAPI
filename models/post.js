'use strict';

const mongoose = require('mongoose');

// this is our schema to represent a restaurant
const blogPostSchema = mongoose.Schema({
  title: String,
  content: String,
  author: {
    firstName: String,
    lastName: String
  },
  created: {type: Date},
});

blogPostSchema.virtual('fullName').get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim()})

blogPostSchema.methods.serialize = function() {
  return {
    title: this.title,
    content: this.content,
    author: this.fullName,
    created: this.created
  }
}

const BlogPost = mongoose.model('BlogPost', blogPostSchema);
module.exports = {BlogPost};
