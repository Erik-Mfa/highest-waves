const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthController {
  // Register a new user
  async register(req, res) {
    try {
      const { username, email, password, role } = req.body;
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: 'Email already exists' });
      
      const max = await User.findOne({}).sort({ id: -1 });
      const newId = max ? max.id + 1 : 1;
  
      // Create new user
      const newUser = new User({ 
        id: newId, 
        username, 
        email, 
        password, 
        role
       });

      const result = await newUser.save();
      return res.status(201).json(result);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }

  // Authenticate user
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'User not found' });

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(password)
      console.log(user.password)
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

      // Generate token
      const token = jwt.sign({ userId: user.id, role: user.role, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.cookie('jwt_token', token, { httpOnly: true });
      
      res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }

  // Logout user
  async logout(req, res) {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
  }
}

module.exports = new AuthController();
