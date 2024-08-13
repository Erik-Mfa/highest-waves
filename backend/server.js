require('./database/mongodb');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoute');
const userRoutes = require('./routes/userRoute');
const beatRoutes = require('./routes/beatRoute');
const orderRoutes = require('./routes/orderRoute');
const tagRoutes = require('./routes/tagRoute');

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000', // Your frontend URL
    credentials: true // This allows cookies to be sent
  };

app.use(express.json());
app.use(cookieParser());

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight requests
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/orders', orderRoutes); 
app.use('/api/beats', beatRoutes);

app.listen(3001, '0.0.0.0', () => console.log('Server running on port 3001'));

module.exports = app;
