const Order = require('../models/Order');
const User = require('../models/User');
const Cart = require('../models/Cart');

const stripe = require('stripe')(process.env.STRIPE_KEY);  // Use the secret key from your .env

class PaymentController {
    async save(req, res) {
        try {
            const { price, user, cart } = req.body;

            // Find the user using the custom id
            const findUser = await User.findOne({ id: user });
            if (!findUser) {
                return res.status(404).json({ message: "User not found" });
            }

            // Find the user's cart using the custom id
            const findUserCart = await Cart.find({ user: findUser._id })  // Use findUser._id
            .populate('beats')
            .populate('user');  // Make sure to populate the correct field here

            console.log(findUserCart)
        
            if (!findUserCart || findUserCart.length === 0) {
                return res.status(200).json({ message: 'No carts found for this user', carts: [] });
            }
            
            // Extract the beat IDs directly from the cart
            const cartItems = findUserCart.flatMap(cart => cart.beats ? [cart.beats._id.toString()] : []).join(',');

            const paymentIntent = await stripe.paymentIntents.create({
                amount: price * 100,  // Convert price to cents
                currency: 'usd',  // Adjust currency if needed
                payment_method_types: ['card'],  // Enable card payments
                metadata: {
                    userId: findUser.id.toString(),  
                    cartId: cartItems,  // Pass the concatenated string
                },
            });

            const newOrder = new Order({
                price,
                beats: cartItems.split(','),  // Store as an array if needed
                user: findUser._id,
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
