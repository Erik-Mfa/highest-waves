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
          const successfulPaymentIntent = event.data.object;
          console.log('PaymentIntent was successful!', successfulPaymentIntent);
          await Order.updateOne({ stripePaymentIntentId: successfulPaymentIntent.id }, { paymentStatus: 'Completed' });
          break;

      case 'payment_intent.payment_failed':
          const failedPaymentIntent = event.data.object;
          console.log('PaymentIntent has failed:', failedPaymentIntent);
          await Order.updateOne({ stripePaymentIntentId: failedPaymentIntent.id }, { paymentStatus: 'Failed' });
          break;

      default:
          console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send('Webhook received successfully');
});


app.use(cookieParser());
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
