const mongoose = require('mongoose');

const borrowingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    borrow_date: { type: Date, default: Date.now },
    return_date: Date,
  });

  module.exports.BorrowBook = mongoose.model('BorrowBook', borrowingSchema);