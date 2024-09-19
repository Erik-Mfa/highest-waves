const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Beat = require('./Beat'); 
const Cart = require('./Cart'); 

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: 'assets/users-images/Standard-User.png',
  },
  role: {
    type: String,
    enum: ['admin', 'customer'],
    default: 'customer',
  }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

// Cascade delete beats and carts when a user is removed
userSchema.pre('remove', async function(next) {
  try {
    // Delete all beats owned by this user
    await Beat.deleteMany({ owner: this.id });
    
    // Delete all carts associated with this user
    await Cart.deleteMany({ user: this.id });
    
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
