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
    
            // Create a payment intent
            const paymentIntent = await stripe.paymentIntents.create({
                amount: price * 100, 
                currency: 'usd',
                payment_method_types: ['card'],
                metadata: {
                    userId: findUser.id.toString(),
                    cartId: cartItems,
                },
            });
    

            const newOrder = new Order({
                id: newId,
                price,
                beats: cartItems.split(','), 
                user: findUser._id,
                billingInfo,
                paymentStatus: 'Pending', 
                stripePaymentIntentId: paymentIntent.id, // Add this line
            });
    
            await newOrder.save();
    
            await Cart.deleteMany({ user: findUser._id });

            // Return client secret and order ID for the frontend to process the payment
            res.status(200).json({
                clientSecret: paymentIntent.client_secret,
                orderId: newOrder.id,
            });
    
        } catch (error) {
            console.error('Error creating payment intent:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async handleWebhook(req, res) {
        const sig = req.headers['stripe-signature'];
        const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

        let event;

        // Log the raw body for debugging
        console.log(req.body);

        try {
            // Use the raw body for the verification
            event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
            console.log('Webhook event verified:', event);
        } catch (err) {
            console.error('Webhook signature verification failed.', err.message);
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        // Handle the event based on its type
        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntent = event.data.object;
                console.log('PaymentIntent was successful!', paymentIntent);
                await Order.updateOne({ stripePaymentIntentId: paymentIntent.id }, { status: 'paid' });
                break;
            case 'charge.succeeded':
                // Handle charge succeeded event
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        res.status(200).send('Webhook received successfully');
    }
    
}


module.exports = new PaymentController();
