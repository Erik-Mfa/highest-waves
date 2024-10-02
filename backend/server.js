require('./database/mongodb');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_KEY);

const authRoutes = require('./routes/authRoute');
const userRoutes = require('./routes/userRoute');
const beatRoutes = require('./routes/beatRoute');
const orderRoutes = require('./routes/orderRoute');
const cartRoutes = require('./routes/cartRoute');
const tagRoutes = require('./routes/tagRoute');
const paymentRoutes = require('./routes/paymentRoute');

const Order = require('./models/Order');

const app = express();

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true // This allows cookies to be sent
};

// Middleware for raw body for Stripe webhook
app.post('/api/payment/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

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
);

// Middleware for parsing other request bodies
app.use(cookieParser());
app.use(bodyParser.json()); // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

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
