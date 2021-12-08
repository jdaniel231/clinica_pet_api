var mongoose = require('mongoose');

var petSchema = new mongoose.Schema({
  name: String,
  nameAnimal: String,
  animal_type: String,
  age: Number,
  weight: Number,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

petSchema.index({'nameAnimal': 'text'});

module.exports = mongoose.model('Pet', petSchema);