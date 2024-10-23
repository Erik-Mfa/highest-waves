const User = require('../models/User')
const bcrypt = require('bcryptjs')

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
}

module.exports = new UserController()
