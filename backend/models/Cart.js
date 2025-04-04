const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true
    },
    beats: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Beat',
      required: true
    },
    license: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'License',
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    finalPrice: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Cart', cartSchema)
