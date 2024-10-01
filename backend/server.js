require('./database/mongodb');
const Order = require('./models/Order')
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoute');
const userRoutes = require('./routes/userRoute');
const beatRoutes = require('./routes/beatRoute');
const orderRoutes = require('./routes/orderRoute');
const cartRoutes = require('./routes/cartRoute');
const tagRoutes = require('./routes/tagRoute');
const paymentRoutes = require ('./routes/paymentRoute')

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true // This allows cookies to be sent
  };

app.use(express.json());
app.use(cookieParser());
  
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use('/assets/beats-logos', express.static(path.join(__dirname, 'public/assets/beats-logos')));
app.use('/assets/beats-audios', express.static(path.join(__dirname, 'public/assets/beats-audios')));
app.use('/assets/users-images', express.static(path.join(__dirname, 'public/assets/users-images')));

app.use('/api/payment', paymentRoutes)
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/beats', beatRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/orders', orderRoutes); 

app.listen(3001, '0.0.0.0', () => console.log('Server running on port 3001'));

module.exports = app;
