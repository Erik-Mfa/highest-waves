const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  beats: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Beat',
    required: true
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
