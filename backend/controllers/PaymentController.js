const Order = require('../models/Order');
const User = require('../models/User');
const Cart = require('../models/Cart');

const stripe = require('stripe')(process.env.STRIPE_KEY);

class PaymentController {
    async save(req, res) {
        try {
            const { price, user, cart, billingInfo } = req.body;

            const max = await Order.findOne({}).sort({ id: -1 });
            const newId = max == null ? 1 : max.id + 1;
    
            const findUser = await User.findOne({ id: user });
            if (!findUser) {
                return res.status(404).json({ message: "User not found" });
            }
    
            const findUserCart = await Cart.find({ user: findUser._id })
                .populate('beats')
                .populate('user');
    
            if (!findUserCart || findUserCart.length === 0) {
                return res.status(200).json({ message: 'No carts found for this user', carts: [] });
            }
    
            const cartItems = findUserCart.flatMap(cart => cart.beats ? [cart.beats._id.toString()] : []).join(',');
    
            const paymentIntent = await stripe.paymentIntents.create({
                amount: price * 100, 
                currency: 'usd',
                payment_method_types: ['card'],
                metadata: {
                    userId: findUser.id.toString(),
                    cartId: cartItems,
                    orderId: newId
                },
            });
    

            const newOrder = new Order({
                id: newId,
                price,
                beats: cartItems.split(','), 
                user: findUser._id,
                billingInfo,
                paymentStatus: 'Pending', 
                stripePaymentIntentId: paymentIntent.id, 
            });
    
            await newOrder.save();
    
            await Cart.deleteMany({ user: findUser._id });

            res.status(200).json({
                clientSecret: paymentIntent.client_secret,
                orderId: newOrder.id,
            });
    
        } catch (error) {
            console.error('Error creating payment intent:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }


    async refund(req, res) {
        try {
            const { orderId } = req.body;

            const order = await Order.findOne({ id: orderId });
            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }

            const refund = await stripe.refunds.create({
                payment_intent: order.stripePaymentIntentId,
            });

            order.paymentStatus = 'Refunded'; 
            order.paymentHistory.push({
                date: new Date(),
                status: 'Refunded',
                message: `Refund processed: ${refund.id}`,
            });

            await order.save();

            res.status(200).json({ message: 'Refund successful', refund });
        } catch (error) {
            console.error('Error processing refund:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    
}


module.exports = new PaymentController();
