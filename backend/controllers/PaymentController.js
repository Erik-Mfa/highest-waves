const Order = require('../models/Order');
const User = require('../models/User');
const Cart = require('../models/Cart');

const stripe = require('stripe')(process.env.STRIPE_KEY);  // Use the secret key from your .env


class PaymentController {

    async save(req, res) {
        try {
            const { price, user, cart } = req.body;

            const findUser = await User.findOne({ id: user });
            if (!findUser) {
                return res.status(404).json({ message: "User not found" });
            }

            const findUserCart = await Cart.find({ user: findUser._id })  // Query by user._id, which is an ObjectId
            .populate('beats')
            .populate('user');
        
        if (findUserCart.length === 0) {
            return res.status(200).json({ message: 'No carts found for this user', carts: [] });
        }

            const cartItems = findUserCart.map(beats => beats.id)

            const paymentIntent = await stripe.paymentIntents.create({
                amount: price * 100,  // Convert price to cents
                currency: 'usd',  // Adjust currency if needed
                payment_method_types: ['card'],  // Enable card payments
                metadata: {
                    userId: findUser.id,  
                    cartId: cartItems.id,  
                },
            });

            const newOrder = new Order({
                price,
                beats: cartItems,  // Assuming multiple carts VAI DA MERDA
                user: findUser.id,
                status: 'Waiting payment',
            });

            await newOrder.save();

            // Return the client secret and order information
            res.status(200).json({
                clientSecret: paymentIntent.client_secret,
                orderId: newOrder.id,
            });

        } catch (error) {
            console.error('Error creating payment intent:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new PaymentController();
