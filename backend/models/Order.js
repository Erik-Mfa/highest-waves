const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
  {
    id: Number,
    price: Number,
    beats: [
      {
        beat: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Beat',
          required: true,
        },
        license: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'License',
          required: true, // Each beat must be associated with a license
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    billingInfo: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true }
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Completed', 'Failed', 'Refunded'], // Include more statuses if necessary
      default: 'Pending'
    },
    stripePaymentIntentId: { type: String, required: true },
    paymentMethod: { type: String }, // Optional: Record payment method type (e.g., card)
    paymentFailureReason: { type: String }, // Record reason for payment failure
    paymentHistory: [
      {
        status: { type: String },
        message: { type: String },
        date: { type: Date, default: Date.now }
      }
    ] // Track the history of payment status changes
  },
  { timestamps: true }
)

module.exports = mongoose.model('Order', orderSchema)
