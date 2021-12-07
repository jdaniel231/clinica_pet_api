var mongoose = require('mongoose');

var petSchema = new mongoose.Schema({
  title: String,
  body: String,
  animal_type: String,
  age: Number,
  wheight: Number,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
});

module.exports = mongoose.model('Pet', petSchema);