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
    basePrice: {
      type: Number,
      required: true,
    },
    streamLimit: {
      type: Number,
      required: true,
    },
    videoClipLimit: {
      type: Number,
      required: true,
    },
    publishingRoyalty: {
      type: Number,
      required: true,
    },
    masterRoyalty: {
      type: Number,
      required: true,
    },
    isExclusive: {
      type: Boolean,
      default: false,
    },
    terms: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      unique: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('License', licenseSchema);
