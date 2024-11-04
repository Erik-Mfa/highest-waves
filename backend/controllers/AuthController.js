const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const axios = require('axios')

class AuthController {
  async register(req, res) {
    try {
      const { username, email, password, role, captchaToken } = req.body

      // Check if captchaToken is provided
      if (!captchaToken) {
        return res
          .status(400)
          .json({ success: false, message: 'CAPTCHA is required' })
      }

      // Send request to Google reCAPTCHA API to verify the token
      const verifyResponse = await axios.post(
        'https://www.google.com/recaptcha/api/siteverify',
        null, // Passing null for the body
        {
          params: {
            secret: process.env.CAPTCHA_SECRET, // Using params to clean up the URL
            response: captchaToken
          }
        }
      )

      // Check the success of the verification
      if (!verifyResponse.data.success) {
        return res
          .status(400)
          .json({ success: false, message: 'CAPTCHA verification failed' })
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, message: 'Email already exists' })
      }

      // Find the highest user ID and increment it
      const max = await User.findOne({}).sort({ id: -1 })
      const newId = max ? max.id + 1 : 1

      // Get the filename from the request file (if it exists)
      const imageFile = req.file
        ? `assets/users-images/${req.file.filename}`
        : 'assets/users-images/Standard-User.png'

      // Hash the password before saving (ensure bcrypt is properly set up)
      const hashedPassword = await bcrypt.hash(password, 10)

      // Create a new user
      const newUser = new User({
        id: newId,
        username,
        email,
        image: imageFile,
        password: hashedPassword, // Save the hashed password
        role
      })

      // Save the new user
      const response = await newUser.save()
      return res.status(201).json({ success: true, user: response }) // Return a success object
    } catch (err) {
      console.error('Registration error:', err.message, err.stack) // More detailed logging
      return res.status(500).json({ success: false, message: err.message })
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body

      const user = await User.findOne({ email })
      if (!user) return res.status(400).json({ message: 'User not found' })

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch)
        return res.status(400).json({ message: 'Invalid credentials' })

      const token = jwt.sign(
        { userId: user.id, role: user.role, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      )

      res.cookie('jwt_token', token, { httpOnly: true })

      res.status(200).json({ message: 'Login successful', token })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: err.message })
    }
  }

  async logout(req, res) {
    res.clearCookie('token')
    res.status(200).json({ message: 'Logout successful' })
  }
}

module.exports = new AuthController()
