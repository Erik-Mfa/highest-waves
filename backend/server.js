require('./database/mongodb');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoute');
const userRoutes = require('./routes/userRoute');
const beatRoutes = require('./routes/beatRoute');
const tagRoutes = require('./routes/tagRoute');
const bcrypt = require('bcryptjs');


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// app.get('/api/test-hashing', async (req, res) => {
//     try {
//       const testPassword = '123';
//       const hashedPassword = await bcrypt.hash(testPassword, 10);
//       console.log('Hashed Password:', hashedPassword);
  
//       const isMatch = await bcrypt.compare(testPassword, hashedPassword);
//       console.log('Password Match:', isMatch); // Should be true
  
//       res.status(200).json({ message: 'Hashing test complete', hashedPassword, isMatch });
//     } catch (err) {
//       console.error('Error:', err);
//       res.status(500).json({ message: 'Error during hashing test', error: err.message });
//     }
//   });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/beats', beatRoutes); 

app.listen(3001, '0.0.0.0', () => console.log('Server running on port 3001'));

module.exports = app;
