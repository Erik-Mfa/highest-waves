require('./database/mongodb');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const Order = require('./models/Order');

const authRoutes = require('./routes/authRoute');
const userRoutes = require('./routes/userRoute');
const beatRoutes = require('./routes/beatRoute');
const orderRoutes = require('./routes/orderRoute');
const cartRoutes = require('./routes/cartRoute');
const tagRoutes = require('./routes/tagRoute');
const paymentRoutes = require('./routes/paymentRoute');

const app = express();

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });

const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true // This allows cookies to be sent
};

app.post('/api/payment/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        console.log('Webhook event verified:', event);
    } catch (err) {
        console.error('Webhook signature verification failed.', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Acknowledge the webhook immediately
    res.status(200).send('Webhook received successfully');

    // Process the event in the background
    try {
        console.log(`Handling event type: ${event.type}`);
        switch (event.type) {
            case 'payment_intent.succeeded': {
                const successfulPaymentIntent = event.data.object;
                console.log('PaymentIntent ID:', successfulPaymentIntent.id); // Log the payment intent ID
                console.log('Payment method:', successfulPaymentIntent.payment_method); // Log payment method
                
                const result = await Order.updateOne(
                    { stripePaymentIntentId: successfulPaymentIntent.id }, 
                    { 
                        paymentStatus: 'Completed',
                        paymentMethod: successfulPaymentIntent.payment_method,
                        $push: { 
                            paymentHistory: { status: 'Completed', message: 'Payment successful' }
                        }
                    }
                );
            
                console.log('Update result:', result); // Log the result of the update operation
                break;
            }
            

            case 'payment_intent.payment_failed': {
                const failedPaymentIntent = event.data.object;
                console.log('PaymentIntent has failed:', failedPaymentIntent);

                const failureReason = failedPaymentIntent.last_payment_error?.message || 'Unknown reason';
                await Order.updateOne(
                    { stripePaymentIntentId: failedPaymentIntent.id }, 
                    { 
                        paymentStatus: 'Failed',
                        paymentFailureReason: failureReason,
                        $push: { 
                            paymentHistory: { status: 'Failed', message: failureReason }
                        }
                    }
                );
                break;
            }

            case 'charge.refunded': {
                const refundedCharge = event.data.object;
                console.log('Refunded charge ID:', refundedCharge.id); // Log the Stripe charge ID
                console.log('Refund metadata:', refundedCharge.metadata); // Log metadata to see if `order_id` is present
                
                // Check if the order ID is correctly passed from Stripe metadata
                const orderId = refundedCharge.metadata.orderId; 
                if (!orderId) {
                    console.error('Order ID not found in metadata. Refund processing skipped.');
                    break;
                }
                
                console.log('Processing refund for Order ID:', orderId);
            
                // Perform the update in the database
                const result = await Order.updateOne(
                    { id: orderId }, 
                    { 
                        paymentStatus: 'Refunded', 
                        $push: { 
                            paymentHistory: { status: 'Refunded', message: 'Charge refunded' }
                        }
                    }
                );
                console.log('Refund update result:', result);
                break;
            }

            default:
                console.log(`Unhandled event type ${event.type}`);
        }
    } catch (error) {
        console.error('Error processing webhook event:', error);
    }
});



app.use(cookieParser());
app.use((req, res, next) => {
    res.cookie('yourCookie', 'value', {
      httpOnly: true,  // Prevents access to the cookie via JavaScript
      sameSite: 'strict' // Protects against CSRF
    });
    next();
  });
  
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Static file serving
app.use('/assets/beats-logos', express.static(path.join(__dirname, 'public/assets/beats-logos')));
app.use('/assets/beats-audios', express.static(path.join(__dirname, 'public/assets/beats-audios')));
app.use('/assets/users-images', express.static(path.join(__dirname, 'public/assets/users-images')));

// Other API routes
app.use('/api/payment', paymentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/beats', beatRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/orders', orderRoutes); 

app.listen(3001, '0.0.0.0', () => console.log('Server running on port 3001'));

module.exports = app;
