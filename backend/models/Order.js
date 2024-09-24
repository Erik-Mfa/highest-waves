const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    id: Number,
    price: Number,    
    beats: [{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Beat',
      required: true
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    billingInfo: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
      
    },
    paymentStatus: { type: String, default: 'unpaid' },

},{ timestamps: true })

module.exports = mongoose.model('Order', orderSchema); 