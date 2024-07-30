const User = require('../models/User');

class UserController {
  // Fetch all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }

  // Fetch a specific user by ID
  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }

  // Update user information
  async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }

  // Delete a user
  async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new UserController();
