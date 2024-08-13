const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    id: Number,
    price: Number,    
    beat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Beat',
        required: true,
      },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    status: { 
        type: String, 
        default: "Waiting payment"
    }
},{ timestamps: true })

module.exports = mongoose.model('Order', orderSchema); 