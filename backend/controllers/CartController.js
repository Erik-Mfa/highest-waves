/* eslint-disable no-unused-vars */
const Cart = require('../models/Cart')
const User = require('../models/User')
const Beat = require('../models/Beat')
const License = require('../models/License')

class CartController {
  async find(req, res) {
    try {
      const result = await Cart.find({}).populate('user').populate('beats')
      res.status(200).json(result)
    } catch (error) {
      console.error('Error finding carts:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  async save(req, res) {
    try {
      const { beat, user, licenseId, finalPrice } = req.body
      console.log('Received cart data:', { beat, user, licenseId, finalPrice })

      const max = await Cart.findOne({}).sort({ id: -1 })
      const newId = max == null ? 1 : max.id + 1

      const findUser = await User.findOne({ id: user })
      if (!findUser) {
        console.log('User not found:', user)
        return res.status(404).json({ message: 'User not found' })
      }

      const findBeat = await Beat.findOne({ _id: beat })
      if (!findBeat) {
        console.log('Beat not found:', beat)
        return res.status(400).json({ message: 'Invalid beat provided' })
      }

      const findLicense = await License.findOne({ _id: licenseId })
      if (!findLicense) {
        console.log('License not found:', licenseId)
        return res.status(400).json({ message: 'Invalid license provided' })
      }

      const cart = new Cart({
        id: newId,
        user: findUser._id,
        beats: findBeat._id,
        license: findLicense._id,
        finalPrice
      })

      const result = await cart.save()
      console.log('Saved cart:', result)
      return res.status(201).json(result)
    } catch (error) {
      console.error('Error saving cart:', error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  async findById(req, res) {
    const tagId = req.params.id

    const result = await Cart.findOne({ id: tagId })
      .populate('beats')
      .populate('user')
    res.status(200).json(result)
  }

  async findCartsByUserId(req, res) {
    const userId = req.params.id

    try {
      const user = await User.findOne({ id: userId })

      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      const carts = await Cart.find({ user: user })
        .populate('beats')
        .populate('user')

      // If no carts found, return an empty array
      if (carts.length === 0) {
        return res
          .status(200)
          .json({ message: 'No carts found for this user', carts: [] })
      }

      // Return the found carts
      res.status(200).json(carts)
    } catch (error) {
      console.error('Error fetching carts:', error)
      res.status(400).json({ message: 'Error fetching carts', error })
    }
  }

  async update(req, res) {
    try {
      const { price, beats, user } = req.body

      const id = req.params.id

      const cart = await Cart.findOne({ id })
      if (!cart) return res.status(404).json({ message: 'Cart not found' })

      const findUser = await User.findOne({ id: user })
      if (!findUser) return res.status(400).json({ message: 'Invalid user' })

      const findBeats = await Beat.find({ id: { $in: beats } })

      if (findBeats.length !== beats.length) {
        return res.status(400).json({ message: 'Invalid beat(s) provided' })
      }

      cart.price = price || cart.price
      cart.user = findUser._id
      cart.beats = findBeats.map((beat) => beat._id)

      const updatedCart = await cart.save()
      res.status(200).json(updatedCart)
    } catch (err) {
      console.error(err)
      res.status(400).json({ message: err.message })
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id
      const cart = await Cart.findOne({ id })
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' })
      }

      await Cart.findOneAndDelete({ id })
      res.status(200).send()
    } catch (error) {
      console.error('Error deleting cart:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}

module.exports = new CartController()
