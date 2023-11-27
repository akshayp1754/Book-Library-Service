const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String,  required: true },
    genre: { type: [  ],  required: true },
    publication_date: Date,
    ISBN: String,
    language : [ String ],
    description: String,
    available_copies: { type: Number, default: 1 },
  });

  module.exports.Book = mongoose.model('Book',BookSchema)