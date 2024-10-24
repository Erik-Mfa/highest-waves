const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Beat = require('./Beat')
const Cart = require('./Cart')

const userSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    image: {
      type: String,
      default: 'assets/users-images/Standard-User.png'
    },
    role: {
      type: String,
      enum: ['admin', 'customer'],
      default: 'customer'
    },
    // New fields for password reset functionality
    resetToken: {
      type: String,
      default: null
    },
    resetTokenExpiry: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  const hashedPassword = await bcrypt.hash(this.password, 10)
  this.password = hashedPassword
  next()
})

userSchema.pre(
  'deleteOne',
  { document: true, query: false },
  async function (next) {
    try {
      const userId = this._id

      await Beat.deleteMany({ owner: userId })
      await Cart.deleteMany({ user: userId })

      next()
    } catch (error) {
      next(error)
    }
  }
)

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User
