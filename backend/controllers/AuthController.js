const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const upload = require('../services/multer/usersMulter')

class AuthController {
  
  async register(req, res) {
    try {

          const { username, email, password, role } = req.body;

          // Check if user already exists
          const existingUser = await User.findOne({ email });
          if (existingUser) return res.status(400).json({ message: 'Email already exists' });

          // Find the highest user ID and increment it
          const max = await User.findOne({}).sort({ id: -1 });
          const newId = max ? max.id + 1 : 1;

          // Get the filename from the request file (if it exists)
          const imageFile = req.file ? `assets/users-images/${req.file.filename}` : 'assets/users-images/Standard-User.png';

          // Create a new user
          const newUser = new User({
            id: newId,
            username,
            email,
            image: imageFile, 
            password,
            role
          });

          // Save the new user
          const result = await newUser.save();
          res.status(201).json({ success: true });


    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'User not found' });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

      const token = jwt.sign({ userId: user.id, role: user.role, username: user.username }, process.env.JWT_SECRET, { expiresIn: '24h' });
      
      

      res.cookie('jwt_token', token, { httpOnly: true });
      
      res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }

  async logout(req, res) {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
  }
}

module.exports = new AuthController();
