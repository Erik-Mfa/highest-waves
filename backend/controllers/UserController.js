/* eslint-disable no-undef */
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const nodemailer = require('nodemailer')

class UserController {
  async find(req, res) {
    try {
      const users = await User.find({})
      res.status(200).json(users)
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: err.message })
    }
  }

  async findById(req, res) {
    try {
      const userId = req.params.id

      const user = await User.findOne({ id: userId })
      if (!user) return res.status(404).json({ message: 'User not found' })
      res.status(200).json(user)
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: err.message })
    }
  }

  async update(req, res) {
    try {
      const userId = req.params.id
      const updatePassword = { ...req.body }

      if (updatePassword.password) {
        // Hash the new password before updating
        const hashedPassword = await bcrypt.hash(updatePassword.password, 10)
        updatePassword.password = hashedPassword
      }

      const user = await User.findOneAndUpdate({ id: userId }, updatePassword, {
        new: true
      })
      if (!user) return res.status(404).json({ message: 'User not found' })
      res.status(200).json(user)
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: err.message })
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id

      // Find the user by id
      const user = await User.findOne({ id })
      if (!user) return res.status(404).json({ message: 'User not found' })

      // Use the instance method 'deleteOne' to delete the user and trigger the 'pre deleteOne' middleware
      await user.deleteOne() // This will trigger the 'pre deleteOne' hook

      res
        .status(200)
        .json({ message: 'User and related data deleted successfully' })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: err.message })
    }
  }

  async forgot(req, res) {
    const { email } = req.body

    const user = await User.findOne({ email })
    console.log(user)
    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpiry = Date.now() + 3600000 // Token valid for 1 hour

    // Save the token and expiry in the user document
    user.resetToken = resetToken
    user.resetTokenExpiry = resetTokenExpiry
    console.log(user)
    await user.save()

    // Set up Nodemailer transport
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or another email service
      auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS // your email password
      }
    })

    // Send the reset email
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${user.resetToken}`
    await transporter.sendMail({
      to: user.email,
      subject: 'Password Reset',
      html: `<p>You requested a password reset. Click the link below to reset your password:</p>
             <a href="${resetUrl}">Reset Password</a>`
    })

    res.status(200).json({ message: 'Password reset email sent' })
  }

  async reset(req, res) {
    const { token } = req.params // Extract token from route parameters
    const newPassword = req.body // Get newPassword from request body

    
    // Find user with the reset token
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    })

    console.log(user)

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' })
    }

    user.password = newPassword.password
    user.resetToken = null // Clear reset token
    user.resetTokenExpiry = null // Clear expiry
    await user.save()

    res.status(200).json({ message: 'Password has been reset' })
  }
}

module.exports = new UserController()
