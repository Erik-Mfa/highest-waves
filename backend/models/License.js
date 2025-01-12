const mongoose = require('mongoose');

const licenseSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priceMultiplier: {
      type: Number,
      required: true,
      default: 1, // Multiplies the beat's base price
    },
    terms: {
      type: String,
      required: true, // Terms of the license in plain text or as a URL to a file
    },
    icon: {
      type: String,
      unique: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('License', licenseSchema);
