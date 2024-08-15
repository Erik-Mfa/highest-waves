const User = require('../models/User');
const Beat = require('../models/Beat');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

class UserController {
  async find(req, res) {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }

  async getUserById(req, res) {
    try {
      const userId = req.params.id;

      const user = await User.findOne({ id: userId });
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }

//   async purchaseBeats(req, res) {
//     try {
//       console.log(req.body)
//         const {userId, beatId} = req.body

//                 // Ensure beatId is in array format
//         const beatIds = Array.isArray(beatId) ? beatId : [beatId];

//         // Convert beatIds to ObjectId if they are in string format
//         const objectIds = beatIds.map(id => mongoose.Types.ObjectId(id));


//         const user = await User.findOne({id: userId});
//         console.log('User:', userId);
//         if (!user) {
//           return res.status(404).json({ message: 'User not found' });
//         }

//         const beat = await Beat.find({id: { $in: req.body.beatId }});
//         console.log('Beat: ' + beat);
//         if (!beat) {
//           return res.status(404).json({ message: 'Beats not found' });
//         }

//         // Check if each beatId exists and push if not already in purchasedBeats
//         for (const id of objectIds) {
//           if (!user.purchasedBeats.includes(id)) {
//             user.purchasedBeats.push(id);
//           }
//         }

//         const populatedUser = await User.findOne({id: user.id}).populate('purchasedBeats').exec();
//         const purchasedBeatIds = populatedUser.purchasedBeats.map(beat => beat.id.toString());

//         const token = jwt.sign(
//           { 
//             userId: user.id, 
//             role: user.role, 
//             username: user.username, 
//             purchasedBeats: purchasedBeatIds // Updated array of beat ids
//           }, 
//           process.env.JWT_SECRET, 
//           { expiresIn: '1h' }
//         );

//         // Send back the updated token as a cookie
//         res.cookie('jwt_token', token, { httpOnly: true });


//         const updatedUser = await user.save();
//         res.status(200).json(updatedUser);
//       } catch (error) {
//         console.error('Error updating purchased beats:', error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// }

  async update(req, res) {
    try {
      const userId = req.params.id;
      const updatePassword = { ...req.body };

      if (updatePassword.password) {
        // Hash the new password before updating
        const hashedPassword = await bcrypt.hash(updatePassword.password, 10);
        updatePassword.password = hashedPassword;
      }

      const user = await User.findOneAndUpdate({id: userId}, updatePassword, { new: true });
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }

  // Delete a user
  async delete(req, res) {
    try {
      const id = req.params.id

      const user = await User.findOne({ id });
      if (!user) return res.status(404).json({ message: 'User not found' });

      await User.findOneAndDelete({ id });
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new UserController();
