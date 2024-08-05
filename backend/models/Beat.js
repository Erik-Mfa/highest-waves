// ./models/Beat.js
const mongoose = require('mongoose');

const beatSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  bpm: {
    type: Number,
    required: true,
  },
  tone: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
  audioURL: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tags: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Tag',
    required: true
  }]
}, { timestamps: true });

module.exports = mongoose.model('Beat', beatSchema);
